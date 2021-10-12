import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { onSaveBoard, loadBoard } from '../store/board.actions.js';
import { Column } from '../cmps/column.jsx';
import { GroupAdd } from '../cmps/GroupAdd.jsx';
import { BoardHeader } from '../cmps/BoardHeader';
import { SidePopUp } from '../cmps/SidePopUp.jsx';
import{BoardSecondHeader} from '../cmps/BoardSecondHeader'

class _Board extends React.Component {


  state = {
  };

  async componentDidMount() {
    try {
      const { boardId } = this.props.match.params;
         await this.props.loadBoard(boardId);
         console.log('this.props.location',this.props.location);
    } catch (err) {
      console.log('err');
    }
    
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    const {board,board: { groups },} = this.props;

    if (!destination) return;

    if (
      destination.droppableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }

    // CHANGE LOCATION BETWEEN GROUPS
    if (type === 'group') {
      const newGroupOrder = [...this.props.board.groups];
      const movedGroup = newGroupOrder.splice(source.index, 1);
      newGroupOrder.splice(destination.index, 0, movedGroup[0]);
      board.groups = newGroupOrder;
      this.props.onSaveBoard(board);
      return;
    }

    const locationGroupStart = source.droppableId;
    const locationGroupFinish = destination.droppableId;

    // CHECK AND MOVE TASKS INSIDE THE SAME GROUP
    if (locationGroupStart === locationGroupFinish) {
      const newGroups = [...groups];
      const indexOfSourceGroup = newGroups.findIndex(
        (group) => group.id === locationGroupStart
      );
      const isolatedGroup = newGroups.splice(indexOfSourceGroup, 1);
      const isolatedTasks = isolatedGroup.map((task) => task.tasks);
      const currTasks = isolatedTasks[0].findIndex(
        (task) => task.id === draggableId
      );
      const targetedTask = isolatedTasks[0].splice(currTasks, 1);
      isolatedTasks[0].splice(destination.index, 0, targetedTask[0]);
      groups[isolatedTasks[0]] = newGroups;
      this.props.onSaveBoard(board);
      return;
    }

    // CHECK AND MOVE TASKS BETWEEN GROUPS
    if (locationGroupStart !== locationGroupFinish) {
      const newGroups = [...groups];
      const indexOfSourceGroup = newGroups.findIndex(
        (group) => group.id === locationGroupStart
      );
      const isolatedStartGroup = newGroups.splice(indexOfSourceGroup, 1);
      const isolatedStartTasks = isolatedStartGroup.map((task) => task.tasks);
      const currTasks = isolatedStartTasks[0].findIndex(
        (task) => task.id === draggableId
      );
      const targetedTask = isolatedStartTasks[0].splice(currTasks, 1);

      const indexOfDestinationGroup = newGroups.findIndex(
        (group) => group.id === locationGroupFinish
      );
      const isolatedDestinaionGroup = newGroups.splice(
        indexOfDestinationGroup,
        1
      );
      const isolatedDestinationTasks = isolatedDestinaionGroup.map(
        (task) => task.tasks
      );
      isolatedDestinationTasks[0].splice(destination.index, 0, targetedTask[0]);
      groups[isolatedDestinationTasks] = newGroups;
      this.props.onSaveBoard(board);
      return;
    }
    return;
  };

  render() {
    const { board} = this.props;
    if (!board) return <div>loading...</div>; 
    const { groups } = board;

    return (
      <div className="in-board" 
      style={board.style.coverColor  ?
        {background:`${board.style.coverColor}`}:
        {backgroundImage:`url(${board.style.imgUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}
         >
         <BoardHeader/>
         <BoardSecondHeader title={board.title}/>
        <main className="board-container" >
       
         
        <DragDropContext onDragEnd={this.onDragEnd}>
        
          <Droppable
            droppableId='groups.id'
            direction='horizontal'
            type='group'>
              {(provided) => (
                <div  {...provided.droppableProps} ref={provided.innerRef} className="group-tasks-container">
                {groups.map((group, index) => {
                  const tasks = group.tasks
                  return ( !group.isArchived &&
                    <Column
                    key={group.id}
                    group={group}
                    tasks={tasks}
                    index={index}
                    board={board}
                    onSaveBoard={this.props.onSaveBoard}
                    />
                    );
                  })}
                {provided.placeholder}
                <GroupAdd board={board} onSaveBoard={this.props.onSaveBoard} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
            </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    boards: state.boardModule.boards,
  };
}

const mapDispatchToProps = {
  onSaveBoard,
  loadBoard,
};

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board);
