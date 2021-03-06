import React from 'react';
import { connect } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close';
import { closePopover } from '../../store/actions/app.actions'
import { boardService } from '../../services/board.service';

export class _Popover extends React.Component {

    state = {
        top: null,
        left: null,
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1000) return
            this.onSetPopoverPos()
        });
        this.onSetPopoverPos()
    }

    componentDidUpdate(prevProps) {
        if (this.props.elPos !== prevProps.elPos) {
            this.onSetPopoverPos()
        }
    }


    onSetPopoverPos = async () => {
        const { elPos, displayMode } = await this.props
        console.log(window.innerHeight);
        if (!this.selectedDiv) return
        const elRect = this.selectedDiv.getBoundingClientRect()
        let { left, top} =  boardService.setPopoverPos(elPos, elRect)
        if (window.innerHeight < 937) {
            top = window.innerHeight - elRect.height - 225
            left = window.innerWidth - elRect.width - 60
        }
        if (displayMode === 'menu-popovers') {
            top = 40;
            left = window.innerWidth - elRect.width;
        }
        this.setState({ top, left})
    }

    render() {
        const { children, title, closePopover, isOverlayOpen, overlay, displayMode } = this.props
        const { top, left } = this.state

        return <>
            {overlay !== 'none' && isOverlayOpen && <div className="overlay" onClick={closePopover} />}
            <div className={`pop-over ${displayMode} `}
                style={displayMode === 'menu' ? {} : { top: `${top}px`, left: `${left}px` }}
                ref={(div) => { this.selectedDiv = div }} >
                <div className={`pop-over-header ${displayMode} `}>
                    <h3>{title}</h3>
                    <button className="clean-btn" onClick={closePopover}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="pop-over-content">
                    {children}
                </div>
            </div>
        </>

    }
}


const mapDispatchToProps = {
    closePopover
}

function mapStateToProps(state) {
    return {
        isOverlayOpen: state.appModule.isOverlayOpen,
        elPos: state.appModule.currPopover.elPos
    }
}
export const Popover = connect(mapStateToProps, mapDispatchToProps)(_Popover)