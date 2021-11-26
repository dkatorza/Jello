import React from 'react';
import { connect } from 'react-redux'
import Modal from '@mui/material/Modal'
import { onSaveBoard, openQuickPopUp } from '../store/board.actions';
import { TaskTitleEdit } from '../cmps/TaskTitleEdit';
import { PopUpHandler } from '../cmps/PopUpHandler'
import { QuickPopUp } from '../cmps/QuickPopUp'
import { ActionsContainer } from './ActionsContainer';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import CopyAllOutlinedIcon from '@mui/icons-material/CopyAllOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

class _TaskQuickMenu extends React.Component {

    state = {
        isMenuOpen: true,
        taskTitle: '',
        clickedCover: false,
    }

    componentDidMount(){
        console.log('gh',this.props);
    }

    handleClose = (ev) => {
        ev.stopPropagation()
        if (ev.key === 'Enter') {
            const { isMenuOpen } = this.state
            this.setState({ isMenuOpen: !isMenuOpen })
            return
        }

    }

    toggleQuickMenu = (ev) => {
        ev.stopPropagation()
        const { isMenuOpen } = this.state
        this.setState({ isMenuOpen: !isMenuOpen })
        this.props.handleEditIcon()

    }

    setPopUpDims = (ev) => {
        const cmpName = ev.target.name
        const cmpTitle = ev.target.title
        const group = this.props.group
        const task = this.props.task
        const menuBtnDims = ev.target.getBoundingClientRect();
        let { top, left } = menuBtnDims;
        this.props.openQuickPopUp(top, left, cmpName, cmpTitle, task.id, group.id)
        const { isQuickPopUpOpen } = this.state;
        this.setState({ isQuickPopUpOpen: !isQuickPopUpOpen })
    }


    sendToArchive = ({ target }) => {
        const { task, onSaveBoard, board } = this.props
        if (target.name === 'archive') {
            task.isArchived = true
            onSaveBoard(board)
        }
    }
    
    handleCover = () => {
        this.setState({ clickedCover: !this.state.clickedCover })
    }

    render() {
        const { isMenuOpen, isQuickPopUpOpen } = this.state
        const { task, width, height, right, onSaveBoard, board, coverColor, group, } = this.props
        return (

            <div>
                {isMenuOpen ?
                    <Modal className="quick-menu-modal" 
                    style={{ bottom: this.props.bottom, top: this.props.top  , left: this.props.left + 227 + 'px' }}
                        onClose={this.handleClose}
                        closeAfterTransition
                        open={isMenuOpen}
                        onBackdropClick={(ev)=>{this.toggleQuickMenu(ev)}}
                        disableAutoFocus
                        onKeyDown={this.handleClose}
                        onClick={this.handleClose}
                    >
                        <div >
                            <div>
                                <TaskTitleEdit task={task} width={width} height={height} right={right}
                                 onSaveBoard={onSaveBoard} board={board} coverColor={coverColor} />
                            </div>
                            <div>
                                <a className="quick-task-editor-buttons-items" ><span style={{ display: 'flex' }}>
                                    <ArtTrackIcon className="task-quick-menu-icons" fontSize="small" />
                                    </span><span className="task-quick-menu-txt">Open card</span></a>

                                <a className="quick-task-editor-buttons-items" onClick={(ev) => this.setPopUpDims(ev)}
                                    name="LABELS" group={group} task={task} title="Labels">
                                    <LocalOfferOutlinedIcon className="task-quick-menu-icons" fontSize="small"
                                        style={{ pointerEvents: 'none', marginRight: '4px' }} />
                                    Edit labels</a>

                                <a className="quick-task-editor-buttons-items" onClick={(ev) => this.setPopUpDims(ev,this.props.group,this.props.task)}
                                    name="MEMBERS" group={group} task={task} title="Members">
                                     <PersonOutlineIcon className="task-quick-menu-icons" fontSize="small" 
                                         style={{ pointerEvents: 'none', marginRight: '4px' }} />
                                   Change members</a>

                                <a className="quick-task-editor-buttons-items" onClick={(ev) => this.setPopUpDims(ev)}
                                    name="COVERS" group={group} task={task} title="Cover">
                                    <VideoLabelIcon className="task-quick-menu-icons" fontSize="small"
                                        style={{ pointerEvents: 'none', marginRight: '4px' }} />
                                    Change cover</a>

                                <a className="quick-task-editor-buttons-items">
                                    <span style={{ display: 'flex' }}>
                                        <DriveFileMoveOutlinedIcon className="task-quick-menu-icons" fontSize="small" />
                                    </span ><span className="task-quick-menu-txt">Move</span></a>

                                <a className="quick-task-editor-buttons-items">
                                    <span style={{ display: 'flex' }}>
                                        <CopyAllOutlinedIcon className="task-quick-menu-icons" fontSize="small" />
                                    </span><span className="task-quick-menu-txt">Copy</span></a>

                                <a className="quick-task-editor-buttons-items">
                                    <span style={{ display: 'flex' }}>
                                        <AccessTimeOutlinedIcon className="task-quick-menu-icons" fontSize="small" />
                                    </span><span className="task-quick-menu-txt">Edit dates</span></a>

                                <a className="quick-task-editor-buttons-items" name="archive"
                                    onClick={(ev) => this.sendToArchive(ev)}>
                                    <ArchiveOutlinedIcon className="task-quick-menu-icons" fontSize="small"
                                        style={{ pointerEvents: 'none', marginRight: '4px' }} />
                                    Archive</a>

                            </div>
                            {isQuickPopUpOpen ? <QuickPopUp> <PopUpHandler /> </QuickPopUp> : ''}
                        </div>
                    </Modal>
                    : ''
                }
            </div >
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


export const TaskQuickMenu = connect(mapStateToProps, mapDispatchToProps)(_TaskQuickMenu)