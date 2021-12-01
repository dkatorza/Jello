import React from 'react';
import { Popover } from "./Popover";
import { onSaveBoard, loadBoards } from '../../store/actions/board.actions'
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { closePopover } from '../../store/actions/app.actions'
import { utilsService } from "../../services/utils.service";

class _PopoverMoveCopy extends React.Component {

    state = {
        board: '',
        listId: '',
        cardIdx: 0,
        title: '',
        boards: ''
    }

    componentDidMount() {
        this.props.loadBoards()
        const { boards,board, card } = this.props
        console.log('b',boards);
        const listIdx = board.lists.findIndex(list => list.cards.some(boardCard => boardCard.id === card.id))
        this.setState({ boards, board, listId: board.lists[listIdx].id, title: card.title })
        console.log('d',this.state.boards);
    }

    onBoardSelect = ({target}) => {
        const {value} = target
        this.setState({ board: value })
        console.log(this.state);
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        this.setState({ [name]: value })
    }

    onMoveCard = (cardToMove) => {
        const { closePopover, onSaveBoard } = this.props
        const { board, listId, cardIdx } = this.state
        board.lists.forEach(list => {
            list.cards.forEach((boardCard, idx) => {
                if (boardCard.id === cardToMove.id) list.cards.splice(idx, 1)
            })
            if (list.id === listId) list.cards.splice(cardIdx, 0, cardToMove)
        })
        const updatedBoard = JSON.parse(JSON.stringify(board))
        onSaveBoard(updatedBoard)
        closePopover()
    }

    onCopyCard = () => {
        const { card } = this.props
        const duplicateCard = JSON.parse(JSON.stringify(card))
        duplicateCard.id = utilsService.makeId()
        duplicateCard.title = this.state.title
        this.onMoveCard(duplicateCard)
    }

    get chosenListIdx() {
        const { board, listId } = this.state
        return board.lists.findIndex(list => list.id === listId)
    }

    render() {
        const { board, boards, listId, cardIdx, title } = this.state
        const { popoverType, card } = this.props
        if (!board) return ''
        const listIdx = this.chosenListIdx
        const chosenCards = board.lists[listIdx].cards
        return <Popover title={popoverType === 'move' ? 'Move card' : 'Copy card'}>
            {popoverType === 'copy' && <>
                <label htmlFor="title-copy">Title</label>
                <input type="text" className="pop-over-input" onChange={this.handleChange} value={title} name="title" id="title-copy" autoFocus />
                <label>Copy To...</label>
            </>}
            <div className="pop-over-move-content ">
                <div className="move-selection flex wrap">
                    <FormControl variant="filled" className="board-select clean-select">
                        <InputLabel id="board-select flex wrap">Board</InputLabel>
                        <Select
                            labelId="board-select"
                            id="board-select"
                            value = ""
                            onChange={this.onBoardSelect}
                        >
                            {boards.map((board,idx) =>
                                <MenuItem key={idx} value={board._id}>{board.title}</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl variant="filled" className="list-select clean-select" >
                        <InputLabel id="demo-simple-select-filled-label">List</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={listId}
                            name="listId"
                            onChange={this.handleChange}
                        >
                            {board.lists.map(list => <MenuItem key={list.id} value={list.id}>{list.title}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" className="position-select clean-select">
                        <InputLabel id="demo-simple-select-filled-label">Position</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={cardIdx}
                            name="cardIdx"
                            onChange={this.handleChange}
                        >
                            {chosenCards.length ?
                                chosenCards.map((card, idx) => <MenuItem key={idx} value={idx}>{idx ? idx + 1 : 1}</MenuItem>)
                                :
                                <MenuItem value={0}>1</MenuItem>}
                        </Select>
                    </FormControl>
                </div>
                {popoverType === 'move' ?
                    <button className="primary-btn wide-btn" onClick={() => this.onMoveCard(card)}>Move</button>
                    :
                    <button className="primary-btn wide-btn" onClick={this.onCopyCard}>Create card</button>
                }
            </div>
        </Popover>
    }
}
const mapDispatchToProps = {
    onSaveBoard,
    closePopover,
    loadBoards
}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        boards: state.boardModule.boards
    }
}


export const PopoverMoveCopy = connect(mapStateToProps, mapDispatchToProps)(_PopoverMoveCopy)