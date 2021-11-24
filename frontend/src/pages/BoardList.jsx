import React from "react";
import { connect } from "react-redux";
import { onSaveBoards,loadBoards } from '../store/board.actions';
import { AppHeader } from "../cmps/app-header";
import { BoardsList } from '../cmps/boards-list';
import { ReactComponent as BoardIcon } from "../assets/img/board-icon.svg";
import { ReactComponent as StarIcon } from "../assets/img/star-icon.svg";

class _BoardList extends React.Component {
 
  async componentDidMount() {
    try {
    const userId = await this.props.loggedUser._ID;
    await this.props.loadBoards(userId);
     } catch (err) {
    console.log('err');
  }
}  

  get favoriteBoards() {
    const { boards } = this.props
    return boards.filter(board => board.isFavorite)
  };  
  get notFavoriteBoards() {
    const { boards } = this.props
    return boards.filter(board => !board.isFavorite)
  };  

  onToggleFavorite = (ev, boardId) => {
    ev.preventDefault()
    const { boards,onSaveBoards } = this.props
    const board = boards.find(board => board._id === boardId)
    board.isFavorite = !board.isFavorite
    onSaveBoards(boards);
  };

  render() {
    const { boards, loggedUser } = this.props;
    if (!boards) return <div>Loading</div>;
    return (
      <section className="board-page">
        <AppHeader />
        <section className="board-list-container flex align-flex-start justify-center">
          <div className="boards-wrapper flex column">
            <div className="boards-preview flex column">
              <div className="preview-title flex align-center">
                <StarIcon className=" far fa-star"/>
                <h3 className="flex"> Starred boards</h3>
              </div>
              <BoardsList onToggleFavorite={this.onToggleFavorite} boards={this.favoriteBoards} />
            </div>

            <div className={"boards-preview"}>
              <div className={"preview-title flex align-center"}>
                 <BoardIcon /> 
                <h3 className="flex">
                  {/* {loggedUser.username}'s Workspaces */}
                  Workspaces
                </h3>
              </div>
              <BoardsList onToggleFavorite={this.onToggleFavorite} boards={this.notFavoriteBoards} />
            </div>
          </div>
        </section>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedUser: state.userModule.user,
    boards: state.boardModule.boards,
  };
}
const mapDispatchToProps = {
  onSaveBoards,
  loadBoards,
};

export const BoardList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardList);
