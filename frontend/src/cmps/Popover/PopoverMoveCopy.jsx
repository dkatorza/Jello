import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Popover } from "./Popover";
import { onSaveBoard, loadBoards } from '../../store/actions/board.actions'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { closePopover } from '../../store/actions/app.actions'
import { utilsService } from "../../services/utils.service";

class _PopoverMoveCopy extends React.Component {

    state = {
        boards: '',
        board: '',
        fromBoard:'',
        fromBoardId: '',
        list: '',
        boardId: '',
        listId: '',
        cardIdx: 0,
        title: ''
    }

    async componentDidMount() {
        await this.props.loadBoards()
        const { boards, board, card } = this.props
        console.log('props',this.props);
        this.setState({ boards: boards,fromBoard:board, fromBoardId: board._id, board: board, title: card.title })

    }

    onBoardSelect = async ({ target }) => {
        const { value } = await target
        const { boards } = this.props
        this.setState({ boardId: value, board: boards.find(board => board._id === value) })
    }

    handleChange = async ({ target }) => {
        const { board } = this.state
        const { name, value } = await target
        this.setState({ [name]: value })

        if (name === 'listId') {
            this.setState({ list: board.lists.find(list => list.id === value) })
        }
    }

    onMoveCard = async (cardToMove) => {
        const { closePopover, onSaveBoard,history} =  this.props
        const { board, listId, cardIdx,fromBoard} = this.state
        if(fromBoard._id !== board._id) {
            fromBoard.lists.forEach(list => {
                list.cards.forEach((boardCard, idx) => {
                    if (boardCard.id === cardToMove.id) list.cards.splice(idx, 1)
                })
            })
            const updatedOriginBoard = await JSON.parse(JSON.stringify(fromBoard))
            onSaveBoard(updatedOriginBoard)
        }      
        board.lists.forEach(list => {
            list.cards.forEach((boardCard, idx) => {
                if (boardCard.id === cardToMove.id) list.cards.splice(idx, 1)
            })
            if (list.id === listId) list.cards.splice(cardIdx, 0, cardToMove)
        })
        const updatedBoard = JSON.parse(JSON.stringify(board))
        onSaveBoard(updatedBoard)
        closePopover()
        history.push(`/board/${board._id}`)
    }

    onCopyCard = async () => {
        const { card } = this.props
        const duplicateCard = JSON.parse(JSON.stringify(card))
        duplicateCard.id = await utilsService.makeId()
        duplicateCard.title = this.state.title
        this.onMoveCard(duplicateCard)
    }

    render() {
        const { boards, board, list, listId,title } = this.state
        const { popoverType, card } = this.props
        if (!boards) return ''

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
                            value={board._id}
                            onChange={this.onBoardSelect}
                        >
                            {boards.map((board, idx) =>
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
                            value=''
                            name="cardIdx"
                            onChange={this.handleChange}
                        >
                            {list && list.cards.map((card, idx) => <MenuItem key={idx} value={idx}>{idx ? idx + 1 : 1}</MenuItem>)}
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


export const PopoverMoveCopy = connect(mapStateToProps, mapDispatchToProps)(withRouter(_PopoverMoveCopy))