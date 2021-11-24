import React from 'react';
import { connect } from 'react-redux'
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import {onSaveBoard,openQuickPopUp } from '../store/board.actions'


class _GroupPopMenu extends React.Component {

    state = {
        isPopUpOpen: true,
        // top:0
    }

    

    toggleQuickPopUp = (ev) => {
        ev.preventDefault();
        const { isPopUpOpen } = this.state;
        this.setState({ isPopUpOpen: !isPopUpOpen });
    };




    render() {
        
        const { isPopUpOpen} = this.state
        const {children,currPopUp,title} = this.props
        return (
            <div >
                {isPopUpOpen ?

                    <Modal
                        style={{ top: currPopUp.top, left: currPopUp.left}} 
                        onClose={this.handleClose}
                        open={isPopUpOpen}
                        disableAutoFocus
                        hideBackdrop
                    >
                        <div className="quick-popup-wrapper"> 
                            <div>
                                <div className="quick-popup-header">
                                    <span className="quick-popup-header-title">{title} </span>  
                                    <a href="#" className="quick-popup-close-btn" onClick={this.toggleQuickPopUp}><CloseIcon fontSize="small"/></a>
                                   
                                </div>
                                <div className="quick-popup-children-content">
                                    {children}
                                </div>
                            </div>
                        </div>
                     </Modal>
                    :
                    ''
                }

            </div>
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
    openQuickPopUp,
}

export const GroupPopMenu = connect(mapStateToProps, mapDispatchToProps)(_GroupPopMenu)