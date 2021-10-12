import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { DialogModal } from './dialog-modal';
import CreateIcon from '@mui/icons-material/Create';
import { TaskQuickMenu } from './TaskQuickMenu';
import { TaskLabelPreview } from './TaskLabelPreview';
import { onSaveBoard, loadBoard, onSetTask } from '../store/board.actions.js';
import { connect } from 'react-redux';

//Need to convert it to scss
const Container = styled.div`

  border-radius: 3px;
  margin-bottom: 8px;
  border:none;
  background-color:white;
  flex: 1 1 auto;
  justify-content: space-between;
  white-space: pre-wrap;
  word-break: break-word;
  box-shadow: 0 1px 0 #091e4240;
  position:relative;
  overflow-y: auto;
  overflow-x: hidden;
`;

class _Task extends React.Component {
  state = {
    board: '',
    columnId: '',
    taskId: '',
    isClicked: false,
    isQuickMenuOpen: false,
    isEditIcon: false,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    top: 0,
    boardMembers:'',
  };

  getDimsOfObject = (ev) => {
    let divTaskDims = this.taskDims.getBoundingClientRect();
    ev.preventDefault();
    let { top, width, height, right, left, bottom } = divTaskDims;
    this.setState({
      menuLeft: left,
      bottom: bottom,
      width: width,
      height: height,
      top: top,
      left: left,
      right: right,
    });
  };

  toggleQuickMenu = async (ev,task) => {
    console.log('sdfsdf',task);
    ev.stopPropagation()
    this.getDimsOfObject(ev);
    const { isQuickMenuOpen } = this.state;
    await this.props.onSetTask({ ...task })
    this.setState({ isQuickMenuOpen: !isQuickMenuOpen });
  };

  handleOpenMainModal = async (bool, task) => {
    this.setState({ isClicked: bool });
    if (bool) {
      await this.props.onSetTask({ ...task })
    }

  };

  onClose = (ev) => {
    const { isClicked } = this.state
    const { isEditIcon } = this.state
    this.setState({ isClicked: !isClicked });
    this.setState({ isEditIcon: !isEditIcon })
  };


  handleEditIcon = () => {
    const { isEditIcon } = this.state
    this.setState({ isEditIcon: !isEditIcon })
  }


  render() {
    const { isQuickMenuOpen, isEditIcon, left, top, bottom, width, height, right } = this.state;
    const { task, onSaveBoard, board, group, task: { style } } = this.props;

    return (

      <div className="root-div"

        ref={(div) => {
          this.taskDims = div;
        }}>

        <Draggable draggableId={this.props.task.id} index={this.props.index}>

          {(provided, snapshot) => (
            <Container className="task-container"

            

              onMouseEnter={this.handleEditIcon}
              onMouseLeave={this.handleEditIcon}

              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              >


              {this.state.isClicked &&
                <DialogModal
                  // boardMembers={this.state.boardMembers}
                  open={this.state.isClicked}
                  onClose={this.onClose}
                  selectedValue={'task'}
                  groupId={this.props.group.id}
                  groupTitle={this.props.groupTitle}
                  coverColor={this.state.coverColor}
                  group={group}
                />
              }
              {style.coverColor.length !== 0 &&
                //  <div className="task-cover-preview" style={{backgroundColor:task.style.coverColor}}> 
                <div onClick={() => {
                  this.handleOpenMainModal(!this.state.isClicked, task);
                }} className="task-cover-preview" style={{ backgroundColor: `${task.style.coverColor}` }}>
                </div>}

              {style.imgUrl.length !== 0 &&
                //  <div className="task-cover-preview" style={{backgroundColor:task.style.coverColor}}> 
                <div onClick={() => {
                  this.handleOpenMainModal(!this.state.isClicked, task);
                }} style={{
                  backgroundImage: `url(${task.style.imgUrl})`,
                  height: '145px',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  
                }}>
                </div>}

              <CreateIcon
                className='quick-edit-icon'
                onClick={(ev) => { this.toggleQuickMenu(ev,task) }}
                style={{ visibility: isEditIcon ? 'visible' : 'hidden' }}
              />
              {task.labelIds.length !== 0 &&
                <div className="task-labels-preview" onClick={() => {
                  this.handleOpenMainModal(!this.state.isClicked, task);
                }}>
                  <ul className="task-preview-labels">
                    {task.labelIds.map(labelId => <TaskLabelPreview key={labelId}
                      labelId={labelId} labels={board.labels} />)}
                  </ul>
                </div>}
              <div style={{ width: '-webkit-fill-available' }}
                onClick={() => {
                  this.handleOpenMainModal(!this.state.isClicked, task);
                }}>

                <div className="task-title">
                  {this.props.task.title}
                </div>
              </div>

              {isQuickMenuOpen ? (
                <div>
                  <TaskQuickMenu left={left} right={right} top={top} bottom={bottom} onSaveBoard={onSaveBoard}
                    height={height} width={width} task={task} group={group} board={board} handleEditIcon={this.handleEditIcon} onOpenCard={this.handleOpenMainModal} />
                </div>)
                :
                ''
              }

            </Container>
          )}
        </Draggable>
      </div >
    );
  }
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    currTask: state.boardModule.currTask,
  };
}

const mapDispatchToProps = {
  onSaveBoard,
  loadBoard,
  onSetTask,
  
};

export const Task = connect(mapStateToProps, mapDispatchToProps)(_Task);