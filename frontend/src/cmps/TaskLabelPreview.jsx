import React from 'react';

export class TaskLabelPreview extends React.Component {

    state= {
        label:''
    }

    componentDidMount() {
        this.setLabel()
    }

    setLabel() {
        const {labelId,labels} = this.props
        const label = labels.find(label => label.id === labelId)
        this.setState({label:label})
    }

    render() {
        const {label} = this.state
        return (
         <li className="list-card-labels">
            <div className="task-list-labels">
                <div className="task-label-preview"
                    style={{ backgroundColor: label.color }} name="label">
                    {/* <span>{label.title}</span> */}
                </div>
            </div>
        </li>
        )
    }
}



  

