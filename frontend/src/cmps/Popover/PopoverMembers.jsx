import React from 'react';
import { Popover } from './Popover';
import { boardService } from '../../services/board.service'
import { PopoverMemberPreview } from './PopoverMemberPreview'
import { onSaveBoard } from '../../store/actions/board.actions';
import { connect } from 'react-redux'



class _PopoverMembers extends React.Component {

    state = {
        inputTxt: '',
        presentedMembers: '',
    }

    componentDidMount() {
        this.setState({ presentedMembers: this.props.board.members })

    }

    handleChange = ({ target }) => {
        this.setState({ inputTxt: target.value }, () => {
            const filterRegex = new RegExp(this.state.inputTxt, 'i')
            this.setState({ presentedMembers: this.props.board.members.filter(member => filterRegex.test(member.fullname)) })
        })
    }

    toggleMember = (member) => {
        const { card, board} = this.props
        const idx = card.members.findIndex(cardMember => cardMember._id === member._id)
        const updatedBoard = boardService.updateCardInBoard(board, card)
        this.props.onSaveBoard(updatedBoard)
    }

    isMemberInCard = (member) => {
        return this.props.card.members.some(cardMember => cardMember._id === member._id)
    }
    render() {
        const { presentedMembers, inputTxt } = this.state
        if (!presentedMembers) return '';
        return <Popover title={"Members"} >
            <div className="members-pop-over-content">
                <input className="pop-over-input" type="text" value={inputTxt}
                    onChange={this.handleChange} placeholder={"Search members"} />
                <h4>BOARD MEMBERS</h4>
                <ul className="clean-list">
                    {presentedMembers.map(member => <PopoverMemberPreview key={member._id} member={member}
                        toggleMember={this.toggleMember} isSelected={this.isMemberInCard(member)} />)}
                </ul>
            </div>
        </Popover>


    }

}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedInUser: state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    onSaveBoard
}


export const PopoverMembers = connect(mapStateToProps, mapDispatchToProps)(_PopoverMembers)

