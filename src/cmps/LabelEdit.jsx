import React from 'react';

export class LabelEdit extends React.Component {

    state = {
        title: '',
        color: '',
        hoverColor:''
    }

    componentDidMount() {
        this.setState({
            title: this.props.currEditLabel.title,
            color: this.props.currEditLabel.color
        })
    }

    handleChange = (ev) => {
        const {value} = ev.target
        this.setState({title:value})
    }

    setSelectedColor = (selectedColor) =>{
        const {color,hoverColor} = selectedColor
        this.setState({color:color,hoverColor:hoverColor})
    }

     onRemoveLabel = () => {
        this.props.removeLabel(this.props.currEditLabel)
        this.props.toggleEditLabel()
    }

    onSaveLabel = () => {
        if (!this.state.title || !this.state.color) return
        this.props.saveLabel({ ...this.state, id: this.props.currEditLabel?.id || '' })
        this.props.toggleEditLabel() 
    }

    render() {
        const { title } = this.state
        const { currEditLabel, colorPalette} = this.props
        
        return (
            <>
                
                <div className="label-add-content">
                    <label className="label-name">Name</label>
                    <input type="text" name="title" value={title} onChange={this.handleChange}
                        className="label-edit-input" />
                    <label className="label-select-color">Select a color</label>
                    <div className="label-new-colors">
                        {colorPalette.map(color => {
                            return <div key={color.id} className="label-edit-palette" style={{ backgroundColor: color.color }}
                                name="color"  value={color.color} hovercolor={color.hoverColor} 
                                    onClick={()=> this.setSelectedColor(color)}/> })}
                    </div>
                </div>
                <div className="label-edit-btns-wrapper">
                    <button className="label-add-btn" onClick={this.onSaveLabel} >
                        {currEditLabel.id && title ? 'Save' : 'Create'}
                    </button>
                    {currEditLabel.id && <button className="label-delete-btn"
                        onClick={this.onRemoveLabel}> Delete </button>}
                </div>
            </>
        )
    }
}