import React from 'react';
import { connect } from 'react-redux'
import { onSaveBoard } from '../store/board.actions'
import { utilService } from '../services/util.service'
import { UploadFiles } from './UploadFiles';
import { UnsplashSearch } from './UnsplashSearch'

class _ChangeBackground extends React.Component {

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

    toggleBoardCover = async (coverColor) => {
        const { board, onSaveBoard } = this.props

        board.style = {
            coverColor,
            imgUrl: '',
        }
        onSaveBoard(board)
    }



    setSelectedColor = (selectedColor) => {
        const { color } = selectedColor
        const coverColor = color
        this.toggleBoardCover(coverColor)
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
        const { board, onSaveBoard } = this.props
        board.style = {
            coverColor,
            imgUrl,
        }
        onSaveBoard(board)
    }

    render() {
        const { board: { colorPalette } } = this.props

        return (
            <>
                <div className="labcoversel-add-content">
                    <label className="border-covers-select-color">Colors</label>
                    <div className="border-covers-new-colors">
                        {colorPalette.map(color => {
                            return <div key={color.id} className="border-covers-edit-palette" style={{ backgroundColor: color.color }}
                                name="color" value={color.color}
                                onClick={() => this.setSelectedColor(color)} />
                        })}
                    </div>
                    <label className="border-covers-select-color">Attachments</label>
                    <div className="border-covers-new-colors">
                        <UploadFiles setFileUpload={this.setFileUpload} />
                    </div>
                    <label className="border-covers-select-color">Unsplash</label>
                    <div className="border-covers-unsplash">
                        <UnsplashSearch perPage={27} onImgUpload={this.onImgUpload} />
                    </div>

                </div>

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

export const ChangeBackground = connect(mapStateToProps, mapDispatchToProps)(_ChangeBackground)