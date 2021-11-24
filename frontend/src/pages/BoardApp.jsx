import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { onSaveBoard, loadBoard } from '../store/board.actions.js';
import { onLogin } from '../store/actions/app.actions'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CardEdit } from '../cmps/CardEdit'
import { CardList } from '../cmps/CardList'
import { CardListAdd } from '../cmps/CardListAdd'
import { BoardHeader } from '../cmps/BoardHeader'

class _BoardApp extends React.Component {


  state = {
    isCardEditOpen: false,
    currCard: null,
    currList: null,
    elPos: null,
  }



  async componentDidMount() {
    try {
      if (!this.props.loggedInUser) this.props.onLogin()
      const { boardId } = this.props.match.params
      await this.props.loadBoard(boardId)
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidUpdate(prevProps) {
    const { boardId } = this.props.match.params
    const { loadBoard, closePopover } = this.props
    if (prevProps.match.params.boardId !== boardId) {
      closePopover()
      await loadBoard(boardId)
    }
  }

  onCloseCardEdit = () => {
    this.setState({ isCardEditOpen: false })
  }


  onDragEnd = (result) => {
    let { board, board: { lists }, onSaveBoard } = this.props
    const { destination, source, type } = result
    if (!destination) return
    const droppableIdStart = source.droppableId
    const droppableIdEnd = destination.droppableId
    const droppableIdxStart = source.index
    const droppableIdxEnd = destination.index

    // CHANGE LOCATION BETWEEN CARD LISTS
    if (type === 'list') {
      const list = lists.splice(droppableIdxStart, 1)
      lists.splice(droppableIdxEnd, 0, ...list)
      board.lists = lists
      onSaveBoard(board)
      return
    }

    // CHECK AND MOVE CARDS INSIDE THE SAME CARD LIST
    if (droppableIdStart === droppableIdEnd) {
      const list = lists.find(list => list.id === droppableIdStart)
      const card = list.cards.splice(droppableIdxStart, 1)
      list.cards.splice(droppableIdxEnd, 0, ...card)
      const listIdx = lists.indexOf(list)
      lists[listIdx] = list
    }

    // CHECK AND MOVE CARDS BETWEEN CARDS LISTS
    if (droppableIdStart !== droppableIdEnd) {
      const listStart = lists.find(list => list.id === droppableIdStart)
      const card = listStart.cards.splice(droppableIdxStart, 1)
      const listEnd = lists.find(list => list.id === droppableIdEnd)
      listEnd.cards.splice(droppableIdxEnd, 0, ...card)
      const listStartIdx = lists.indexOf(listStart)
      const listEndIdx = lists.indexOf(listEnd)
      lists[listStartIdx] = listStart
      lists[listEndIdx] = listEnd
    }

    board.lists = lists
    onSaveBoard(board)
  };

  render() {
    const { onSaveBoard, board, filterBy } = this.props
    const { currCard, currList, elPos, isCardEditOpen } = this.state
    if (!board) return <Loader />

    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <section className="board-app flex column">
            <BoardHeader board={board} onSaveBoard={onSaveBoard} />
            <Route path="/board/:boardId/:listId/:cardId" component={CardDetails} />
            <Route path="/board/:boardId/dashboard" component={Dashboard} />
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="card-list-container flex">
                  {board.lists.map((currList, idx) => {
                    const cards = currList.cards
                    return (
                      <CardList
                        key={currList.id}
                        currListIdx={idx}
                        currList={currList}
                        onSaveBoard={onSaveBoard}
                        board={board}
                        cards={cards} />)
                  })
                  }
                  {provided.placeholder}
                  <CardListAdd board={board} onSaveBoard={onSaveBoard} />
                </div>
              )}
            </Droppable>
          </section>
        </DragDropContext>
        {isCardEditOpen && <CardEdit board={board} currList={currList} card={currCard} elPos={elPos} onCloseCardEdit={this.onCloseCardEdit} />}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    isLoading: state.boardModule.isLoading,
    loggedInUser: state.appModule.loggedInUser,
  };
}

const mapDispatchToProps = {
  onSaveBoard,
  loadBoard,
  onLogin,
};

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
