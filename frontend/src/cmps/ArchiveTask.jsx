import React from 'react';
import { connect } from 'react-redux';
import { onSaveBoard, onSetTask, updateBoard } from '../store/board.actions';
class _Archive extends React.Component {
  state = {
      currTask:''
  };
  componentDidMount(){
      const {currTask} = this.props
      this.setState({currTask})
  }
  handleChange = (ev)=>{
     const { groupId, board, onSaveBoard,currTask } = this.props
            currTask.isArchived=true
            const taskToSave = {...currTask}
            this.props.onSetTask(taskToSave)
            const boardToSave = updateBoard(board, groupId, currTask.id, taskToSave)
            onSaveBoard(boardToSave)
 }
  render() {
    return (
      <div className={'archive-container'} style={{position:'inherit'}}>
        <div className={'archive-msg-container'}>
          All actions will be removed from the activity feed and you won’t be
          able to re-open the card. There is no undo.
        </div>
        <div>
          <button
          onClick={(ev)=>{this.handleChange(ev)}}
            className={'archive-delete-btn'}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    currPopUp: state.boardModule.currPopUp,
    currTask: state.boardModule.currTask,
  };
}

const mapDispatchToProps = {
  onSaveBoard,
  onSetTask,
  updateBoard,
};

export const Archive = connect(mapStateToProps, mapDispatchToProps)(_Archive);
