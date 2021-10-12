import React from 'react';
import { connect } from 'react-redux'
import { onSaveBoard, onSetTask, updateBoard } from '../store/board.actions'
import { utilService } from '../services/util.service'
import { UploadFiles } from './UploadFiles';
import { Unsplash } from './Unsplash'
import { UnsplashSearch } from './UnsplashSearch'

class _Covers extends React.Component {

    state = {
        coverColor: '',
        imgUrl: '',
        isSearchUnsplash: false,
        txt: ''
    }


    toggleUnsplash = () => {
        const { isSearchUnsplash } = this.state
        this.setState({ isSearchUnsplash: !isSearchUnsplash })
    }

    toggleTaskCover = async (coverColor) => {
        if (this.props.from === 'MainDialog') {
            const { currTask, groupId, board, onSaveBoard } = this.props
            // const taskToSave = { ...currTask, style: { ...currTask.style, coverColor } }
            const taskToSave = { ...currTask, style: { ...currTask.style, coverColor, imgUrl: '' } }
            this.props.onSetTask(taskToSave)
            const boardToSave = updateBoard(board, groupId, currTask.id, taskToSave)
            onSaveBoard(boardToSave)
        } else {
            const { board, onSaveBoard, currPopUp } = this.props
            const groupIdx = board.groups.findIndex(group => group.id === currPopUp.group)
            const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === currPopUp.task)
            const task = board.groups[groupIdx].tasks[taskIdx]
            task.style = {
                coverColor,
                imgUrl: '',
            }
            onSaveBoard(board)

        }

    }

    setSelectedColor = (selectedColor) => {
        const { color } = selectedColor
        const coverColor = color
        this.toggleTaskCover(coverColor)
    }

    setFileUpload = (fileUrl) => {
        if (!utilService.isValidImg(fileUrl)) return
        this.setState({ imgUrl: fileUrl, coverColor: '' })
        this.onSaveFile()
    }

    onImgUpload = async (url) => {
        if (!utilService.isValidImg(url)) return
        await this.setState({ imgUrl: url, coverColor: '' })
        this.onSaveFile()
    }


    onSaveFile = () => {
        const { imgUrl, coverColor } = this.state
        const { board, currPopUp } = this.props
        const groupIdx = board.groups.findIndex(group => group.id === currPopUp.group)
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === currPopUp.task)
        const task = board.groups[groupIdx].tasks[taskIdx]
        task.style = {
            coverColor,
            imgUrl,
        }
        if (this.props.from === 'MainDialog') {
            const { imgUrl, coverColor } = this.state
            const { currTask, groupId, board, onSaveBoard } = this.props
            const taskToSave = { ...currTask, style: { ...currTask.style, coverColor, imgUrl } }
            this.props.onSetTask(taskToSave)
            const boardToSave = updateBoard(board, groupId, currTask.id, taskToSave)
            onSaveBoard(boardToSave)
        }else{

            const { imgUrl,coverColor } = this.state
            const { board, onSaveBoard, currPopUp } = this.props
            const groupIdx = board.groups.findIndex(group => group.id === currPopUp.group)
            const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === currPopUp.task)
            const task = board.groups[groupIdx].tasks[taskIdx]
            task.style = {
                coverColor,
                imgUrl,
            }
            
            onSetTask(task)
            onSaveBoard(board)
        }

    }

    render() {
        const { board: { colorPalette } } = this.props
        const { isSearchUnsplash} = this.state

        return (
            <>
                {!isSearchUnsplash ?
                    <div className="labcoversel-add-content">
                        <label className="covers-select-color">Colors</label>
                        <div className="covers-new-colors">
                            {colorPalette.map(color => {
                                return <div key={color.id} className="covers-edit-palette" style={{ backgroundColor: color.color }}
                                    name="color" value={color.color}
                                    onClick={() => this.setSelectedColor(color)} />
                            })}
                        </div>
                        <label className="covers-select-color">Attachments</label>
                        <div className="covers-new-colors">
                            <UploadFiles setFileUpload={this.setFileUpload} />
                        </div>
                        <label className="covers-select-color">Unsplash</label>
                        <div>
                            <Unsplash search={'nature'} onImgUpload={this.onImgUpload} />
                        </div>
                        <div>
                            <label className="cover-img-upload" onClick={this.toggleUnsplash}>Search for photos</label>
                        </div>
                    </div>
                    :
                    <div>
                      <UnsplashSearch perPage={12} onImgUpload={this.onImgUpload}/>
                    </div>
                }
            </>
        )
    }
}



function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        currPopUp: state.boardModule.currPopUp,
        currTask: state.boardModule.currTask,
    }
}


const mapDispatchToProps = {
    onSaveBoard,
    onSetTask,
    updateBoard,
}

export const Covers = connect(mapStateToProps, mapDispatchToProps)(_Covers)