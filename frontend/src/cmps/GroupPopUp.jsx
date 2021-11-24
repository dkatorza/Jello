import React from 'react';
import { connect } from 'react-redux'
import { onSaveBoard, openQuickPopUp } from '../store/board.actions';



class _GroupPopUp extends React.Component {

    state = {
      
    }

    sendToArchive = ({ target }) => {
        console.log('target',target);
        console.log('ssss',this.props);
        const {onSaveBoard,board, group } = this.props
        if (target.name === 'archive') {
            group.isArchived = true
            onSaveBoard(board)
        }
    }


    render() {
        return (
            <>
                    <div className="group-pop-over-wrapper">
                      <ul className="group-pop-over-list" ></ul>
                      <li className="group-pop-over-list-items"> 
                          <a className="group-pop-over-item" name="archive" onClick={(ev) => this.sendToArchive(ev)} >
                              Archive this list
                              </a>
                      </li>
                    </div>
            </>
        )
    }
}



function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        currPopUp: state.boardModule.currPopUp,
    }
}


const mapDispatchToProps = {
    onSaveBoard,
    openQuickPopUp
}

export const GroupPopUp = connect(mapStateToProps, mapDispatchToProps)(_GroupPopUp)