import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { utilService } from '../services/util.service'


export class GroupAdd extends React.Component {

    state = {
        groupTitle: '',
        isWrapperOpen: false
    }

    toggleGroupAdd = () => {
        const { isWrapperOpen } = this.state
        this.setState({ isWrapperOpen: !isWrapperOpen })
    }

    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            this.toggleGroupAdd()
            ev.stopPropagation();
            this.onAddGroup()
            return
        }
        const { value } = ev.target
        this.setState({ groupTitle: value })
    }

    onAddGroup = () => {

        const { groupTitle } = this.state
        const { board, onSaveBoard } = this.props
        const { groups } = board
        const group = {
            id: utilService.makeId(),
            title: groupTitle,
            tasks: []
        }
        if (group.title.length)
            groups.push(group)
        this.setState({ groupTitle: '' })
        onSaveBoard(board)
    }

    render() {
        const { groupTitle, isWrapperOpen } = this.state

        return (

            <div className="add-group-wrapper">
                {isWrapperOpen ?
                    <div className="group-add-open">
                        <div>
                            <input type="text" className="group-add-input"
                                autoFocus
                                placeholder="Enter a list title..."
                                onBlur={this.toggleGroupAdd}
                                value={groupTitle}
                                onChange={this.handleChange}
                                onKeyDown={this.handleChange}
                            />
                        </div>
                        <div className="group-add-controls-wrapper">
                            <button onClick={this.onAddGroup} className="group-add-controls">Add list</button>
                            <CloseIcon onClick={this.toggleGroupAdd}
                                style={{
                                    height: '32px', lineHeight: '32px', width: '32px',
                                    marginTop: '8px', marginLeft: '4px', cursor: 'pointer'
                                }} />
                        </div>
                    </div>

                    :
                    <div className="add-group-wrapper-closed" >
                        <div className="group-add-closed" onClick={this.toggleGroupAdd}><span className="group-add-placeholder">+ Add another list</span></div>
                    </div>
                }
            </div>
        )
    }

}