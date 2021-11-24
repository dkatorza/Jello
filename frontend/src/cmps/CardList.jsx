import React from 'react';
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import { Task } from './Task.jsx'
import { onSaveBoard, openQuickPopUp } from '../store/board.actions';
import { PopUpHandler } from './PopUpHandler'
import { QuickPopUp } from './QuickPopUp'
import { TaskAdd } from './TaskAdd'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {GroupPopUp} from './GroupPopUp'
import { GroupPopMenu } from './GropPopMenu.jsx';

//Need to convert it to scss
const Container = styled.div`
box-sizing:border-box;
display: inline-block;
margin: 4px;
border-radius: 3px;
background-color:#ebecf0;
min-width: 272px;
max-width:272px;
white-space: normal;
vertical-align: top;
overflow-y: hidden;
overflow-x: hidden;
max-height:100%

`;

const Title = styled.h2`    
box-sizing: border-box;
width:100%;
font-weight: 600;
white-space:pre;
overflow: hidden;
white-space: pre-wrap;
word-break:break-word;
font-size: 14px;
line-height: 24px;
min-height: 20px;
padding: 4px 8px;
position: relative;
`

const TaskList = styled.div`
background-color: ${props => (props.isDraggingOver ? `#e1e1e1` : 'inherit')};
flex: 1 1 auto;
margin: 0 4px;
min-height:20px;
overflow-x: hidden;
overflow-y:auto ;
padding: 0 4px;
box-sizing: border-box;
position: relative;
white-space: normal;
max-height:70vh;
`;

class _Column extends React.Component {

    state = {
        isTitleEdit: false,
        groupTitle: '',
        isMenuOpen: false,
        isGroupPopUpOpen: false,
        left: 0,
        top: 0,
    }

    componentDidMount() {
        const title = this.props.group.title
        this.setState({ groupTitle: title })
    }

    toggleTitleEdit = (ev) => {
        const { isTitleEdit } = this.state
        this.setState({ isTitleEdit: !isTitleEdit })
    }

    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            ev.stopPropagation();
            this.onEditGroupTitle()
            this.toggleTitleEdit()
            return
        }
        const { value } = ev.target
        this.setState({ groupTitle: value })
    }

    onEditGroupTitle = () => {
        const { group, onSaveBoard, board } = this.props
        const { groupTitle } = this.state
        if (!groupTitle.length) return
        group.title = this.state.groupTitle
        onSaveBoard(board)

        this.toggleTitleEdit()
        return
    }

    sendToArchive = ({ target }) => {
        const { group, onSaveBoard, board } = this.props
        if (target.name === 'archive') {
            group.isArchived = true
            onSaveBoard(board)
        }
    }

    setPopUpDims = (ev) => {
        console.log('evv', ev);
        const cmpName = ev.target.name
        const cmpTitle = ev.target.title
        const group = this.props
        // const task = this.props
        const menuBtnDims = ev.target.getBoundingClientRect();
        let { top, left } = menuBtnDims;
        this.props.openQuickPopUp(top, left, cmpName, cmpTitle, group.id)
        console.log(top, left);
        const { isGroupPopUpOpen } = this.state;
        this.setState({ isGroupPopUpOpen: !isGroupPopUpOpen })
    };

 

    render() {
        const { board, group, onSaveBoard } = this.props
        const { isTitleEdit, groupTitle,isGroupPopUpOpen } = this.state

        if (!board) return <div>loading...</div>
        return (
            <>
                <Draggable draggableId={this.props.group.id} index={this.props.index}>
                    {(provided) => (
                        <Container {...provided.draggableProps} ref={provided.innerRef}{...provided.dragHandleProps}
                        >
                            <div className="group-header"  ref={(div) => { this.groupDims = div; }}>

                                <MoreHorizIcon className="group-header-tool" fontSize="small"
                                    style={{ fontSize: '14px', height: '32px', lineHeight: '20px', width: '32px' }}
                                    name="GROUPTOOLS" group={group} title={'List actions'}
                                    onClick={(ev) => { this.setPopUpDims(ev) }}
                                />
                                  {isGroupPopUpOpen ? <GroupPopMenu title={'List actions'} > <GroupPopUp group={group}/> </GroupPopMenu> : ''}
                                {isTitleEdit ?
                                    <input type="text" className="group-edit-input"
                                        autoFocus
                                        onBlur={this.onEditGroupTitle}
                                        value={groupTitle}
                                        onChange={this.handleChange}
                                        onKeyDown={this.handleChange}
                                    />
                                    :
                                    <Title onClick={(ev) => { this.toggleTitleEdit(ev) }}>{this.props.group.title}</Title>
                                }
                            </div>
                            <Droppable droppableId={this.props.group.id} type="task" >
                                {(provided, snapshot) => (
                                    <>
                                        <TaskList className="scroller" ref={provided.innerRef} {...provided.droppableProps}
                                            isDraggingOver={snapshot.isDraggingOver}>
                                            {this.props.tasks.map((task, index) => (
                                                !task.isArchived && <Task key={task.id} task={task} index={index}
                                                    board={this.props.board} groupTitle={this.props.group.title} onSaveBoard={onSaveBoard}
                                                    group={group}
                                                />
                                            ))}
                                            {provided.placeholder}

                                        </TaskList>
                                    </>

                                )}

                            </Droppable>
                            <TaskAdd board={board} group={group} onSaveBoard={onSaveBoard} />
                        </Container>

                    )}
                </Draggable>

            </>
        )
    }
}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        currPopUp: state.boardModule.currPopUp,
    };
}
const mapDispatchToProps = {
onSaveBoard,
openQuickPopUp
}
export const Column = connect(mapStateToProps, mapDispatchToProps)(_Column)