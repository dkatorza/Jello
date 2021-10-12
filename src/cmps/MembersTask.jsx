import React from 'react';
import { connect } from 'react-redux';
import { onSaveBoard, onSetTask, updateBoard } from '../store/board.actions';


class _Members extends React.Component {
  state = {
    currTask: '',

  };
  componentDidMount() {
    const { currTask, board } = this.props;
    this.setState({ currTask, board });
    console.log('rrr', currTask, board );

  }

  handleClick = (member) => {
    if (this.props.from === 'MainDialog') {
      const { currTask, board } = this.state;
      const memberToChangeIDX = currTask.members.findIndex((member) => member._id === member.id)
      currTask.members[memberToChangeIDX].isAssigned = !currTask.members[memberToChangeIDX].isAssigned
      this.props.onSetTask(currTask)
      const boardToSave = updateBoard(board, this.props.groupId, currTask.id, currTask)
      this.props.onSaveBoard(boardToSave)
    } else {
      const { board, onSaveBoard, currPopUp } = this.props
      const groupIdx = board.groups.findIndex(group => group.id === currPopUp.group)
      const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === currPopUp.task)
      const task = board.groups[groupIdx].tasks[taskIdx]
      const memberToChangeIDX = task.members.findIndex((member) => member._id === member.id)
      if (memberToChangeIDX === -1) board.groups[groupIdx].tasks[taskIdx].members.push(member)
      // task.members[memberToChangeIDX].isAssigned
      // = !task.members[memberToChangeIDX].isAssigned 
      onSaveBoard(board)
    }



  }

  render() {
    const { currTask, board } = this.state;
    if (!board) return <div></div>;
    if (!currTask) return <div></div>;
    return (
      <div className={'members-container'}>
        <h3>board members</h3>
        {board.members.map((member, idx) => {
          return (
            <div key={idx}>
              <div
                className={'select-member'}
                
                onClick={() => { this.handleClick(member) }}
                title={member.fullname}>
                <div className='member member-on-card'>{member.fullname.substring(0, 1)}</div>
                <div className={'member-fullname'}>
                  {member.fullname}
                  {member.isAssigned && <span className={'v-sign'}>✔</span>}
                </div>
              </div>
            </div>
          );
        })}
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

export const Members = connect(mapStateToProps, mapDispatchToProps)(_Members);
