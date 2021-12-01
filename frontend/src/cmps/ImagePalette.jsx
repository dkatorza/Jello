import React from 'react'
import { unSplashService } from '../services/unsplash.service'

export class ImagePalette extends React.Component {

    state = {
        imgs: [],
        keyword: '',
    }

    componentDidMount() {
        this.onSearch('16:9',this.props.noOfImg)
    }

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ keyword: value }, () => {
            if (value.length >= 3) this.onSearch(this.state.keyword, this.props.noOfImg)
            else if (value.length === 0) this.onSearch(this.state.keyword)
        })
    }

    onSearch = async (keyword, noOfImages) => {
        try {
            const imgs = await unSplashService.searchImgs(keyword, noOfImages)
            this.setState({ imgs })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { imgs, keyword } = this.state
        const { handleChange, styleDisplay } = this.props

        if (!imgs) return <div></div>
        return <div className="image-palette">
            <div className="image-palette-search">
                <span className="search-icon"></span>
                <input type="text" className="search-input" value={keyword}
                    onChange={this.handleChange} onKeyDown={this.handleChange} />
            </div>

            <div className="images">
                {imgs.map(img => {
                    return <label
                        key={img.id}
                        name={`${styleDisplay}`}
                        className="flex align-center justify-center"
                        style={{ backgroundImage: `url(${img.small})` }}
                        htmlFor={`img-${img.id}`}>
                        <input type="radio" name="imgUrl" id={`img-${img.id}`} value={img.full}
                            onClick={handleChange} />
                    </label>
                })}
            </div>
        </div>
    }
}

