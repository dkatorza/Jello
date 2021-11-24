import React from 'react';
import { connect } from 'react-redux'
import { onSaveBoard } from '../store/board.actions';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { Unsplash } from './Unsplash';
import { UnsplashSearch } from './UnsplashSearch';
import { Covers } from './Covers';
import { ChangeBackground } from './ChangeBackground';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

class _SidePopUp extends React.Component {

    state = {
        isMenuOpen: true,
        anchor: 'right',
        open: true,
        title:'Menu'
    }

    toggleSidePopUp = (ev) => {
        const { open } = this.state
        if (ev.type === 'keydown' &&
            (ev.key === 'Tab' || ev.key === 'Shift')) {
            return;
        }

        this.setState({ open: !open })
    }

    toggleCmp =({target})=> {
        const {title,isMenuOpen} = this.state
       
        this.setState({title:target.title})
        this.setState({isMenuOpen:!isMenuOpen})
    }



    render() {
        const { board } = this.props
        const { isMenuOpen, anchor, open,title } = this.state


        return (
            <>
                <Drawer className="side-popup-container"
                    anchor={anchor}
                    open={open}
                    hideBackdrop
                    // onBackdropClick ={this.toggleSidePopUp}
                   
                >
                    <div className="side-popup-wrapper">
                        <div>
                            <div className="side-popup-header">
                                <span className="side-popup-header-title">{title}</span>
                                <a href="#" className="side-popup-close-btn" onClick={(ev)=>{this.toggleSidePopUp(ev)}}><CloseIcon /></a>
                            </div>
                        {isMenuOpen ? 
                        <div>
                            <div className="side-popup-children-content">
                            <a className="menu-nav-link">
                                    <span className="menu-nav-icon"><HistoryEduOutlinedIcon/></span>
                                    <span className="menu-nav-title"> About this board</span>
                                </a>
                                <a className="menu-nav-link" 
                                
                                >
                                    <span className="menu-nav-change-bg-icon"></span>
                                    <span className="menu-nav-title" title="Change background" onClick={(ev)=>{this.toggleCmp(ev)}} > Change background</span>
                                </a>
                                <a className="menu-nav-link">
                                    <span className="menu-nav-icon"><ArchiveOutlinedIcon/></span>
                                    <span className="menu-nav-title"> Archive</span>
                                </a>

                            </div>
                            <div className="side-popup-activity-container">
                            <a className="side-popup-activity-header">
                                    <span className="activity-header-icon"><FormatListBulletedOutlinedIcon/></span>
                                    <span className="activity-header-title"> Activity</span>
                                </a>
                            </div>
                           
                            </div> :
                            
                            <ChangeBackground board={board}/>
                            }
                        </div>
                        
                    </div>
                </Drawer>
            </>
        )
    }
}



function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}


const mapDispatchToProps = {
    onSaveBoard,
}

export const SidePopUp = connect(mapStateToProps, mapDispatchToProps)(_SidePopUp)