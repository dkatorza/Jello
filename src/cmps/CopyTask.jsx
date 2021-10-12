import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { connect } from 'react-redux';
import {
  onSaveBoard,
  onSetTask,
  updateBoard,
  loadBoardsToState,
} from '../store/board.actions';
import { Box, spacing } from '@mui/system';
import { boardService } from '../services/board.service';
import { utilService } from '../services/util.service';

class _Copy extends React.Component {
  state = {
    newTask: '',
    title: '',
    isBoardClicked: false,
    selectedBoard: '',
    isListClicked: false,
    selectedGroup: '',
    isCreated: false,
  };
  componentDidMount() {
    this.props.loadBoardsToState();
    const { currTask } = this.props;
    this.setState({ newTask: currTask, title: currTask.title });
  }

  handleChange = (ev, key, Id = 'null') => {
    ev.stopPropagation();
    const { newTask } = this.state;
    if (ev.key === 'Enter' || ev.type === 'blur') {
      if (key === 'title') {
        this.setState({ title: ev.target.value });
        newTask[key] = ev.target.value;
      }
    }
    if (key === 'board') {
      const selectedBoard = this.props.boards.find((board) => {
        return board._id === Id;
      });
      this.setState({ selectedBoard, isBoardClicked: false });
    }
    if (key === 'group') {
      const selectedGroup = this.state.selectedBoard.groups.find((group) => {
        return group.id === Id;
      });
      this.setState({ selectedGroup, isListClicked: false });
    }
  };

  handleCreateCard = (ev) => {
    ev.preventDefault();
    const { boards } = this.props;
    const { selectedBoard, selectedGroup, newTask } = this.state;
    newTask.id = utilService.makeId();
    const groupIdx = selectedBoard.groups.findIndex(
      (group) => group.id === selectedGroup.id
    );
    selectedBoard.groups[groupIdx].tasks.push(newTask);
    boardService.save({...selectedBoard});
    this.setState({ isCreated: true });
  };

  render() {
    const { newTask, selectedBoard, selectedGroup } = this.state;

    return (
      <div className={'copy-container'} style={{ position: 'inherit' }}>
          <h3>Title</h3>
          <Box>
            <FormControl 
            className={'MuiFormControl-root copy'}
            
              variant='standard'
              onKeyDown={(ev) => this.handleChange(ev, 'title')}
              onBlur={(ev) => this.handleChange(ev, 'title')}>
              <input defaultValue={newTask.title} id='copy-input' />
            </FormControl>
          </Box>
          <h3>Copy to Board:{selectedBoard.title && selectedBoard.title}</h3>
          <Box>
            <FormControl fullWidth>
              <Select
                value={''}
                defaultValue={''}
                open={this.state.isBoardClicked}
                placeholder={'Boards'}
                labelId='select-label'
                id='select-label'
                onClick={() =>
                  this.setState({ isBoardClicked: !this.state.isBoardClicked })
                }>
                {this.props.boards.map((board, idx) => {
                  return (
                    <div key={idx}>
                      <MenuItem
                        onClick={(ev) =>
                          this.handleChange(ev, 'board', board._id)
                        }
                        value={board.title}>
                        {board.title}
                      </MenuItem>
                    </div>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <h3>In list..{selectedGroup.title && selectedGroup.title}</h3>
          <Box>
            <FormControl fullWidth>
              <Select
                value={''}
                open={this.state.isListClicked}
                labelId='select-label'
                id='select-label'
                onClick={() =>
                  this.setState({ isListClicked: !this.state.isListClicked })
                }>
                {selectedBoard !== '' &&
                  selectedBoard.groups.map((group, idx) => {
                    return (
                      <div key={idx}>
                        <MenuItem
                         
                          onClick={(ev) =>
                            this.handleChange(ev, 'group', group.id)
                          }
                          value={group.title}>
                          {group.title}
                        </MenuItem>
                      </div>
                    );
                  })}
              </Select>
            </FormControl>
          </Box>

          <div className={'create-btn-container'}>
            <button className={'create-btn'}
              onClick={(ev) => {
                this.handleCreateCard(ev);
              }}>
              Create Card
            </button>
            {this.state.isCreated && <span> ...Copied!</span>}
          </div>
       
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    boards: state.boardModule.boards,
    currPopUp: state.boardModule.currPopUp,
    currTask: state.boardModule.currTask,
  };
}

const mapDispatchToProps = {
  onSaveBoard,
  onSetTask,
  updateBoard,
  loadBoardsToState,
};

export const Copy = connect(mapStateToProps, mapDispatchToProps)(_Copy);
