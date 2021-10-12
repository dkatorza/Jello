import React from 'react';
import { Cover } from './Cover';
import { Covers } from './Covers';
import { Dates } from './Dates';

export class ActionsContainer extends React.Component {
  state = {
    type: '',
    savedDate: '',
  };
  componentDidMount() {
    this.setState({ type: this.props.type });
  }
  saveDate = (savedDate) => {
    this.setState({ savedDate });
    this.props.onClose()
    //TODO dispatch, save board with new date
  };
  render() {
    const {type} = this.state
    return (
      <div className={`menu-container`}>
        {type==='Members' && <div>abc</div>}
        {type==='Cover' && <div > <Covers from={'MainModal'} groupId={this.props.groupId}/> </div>}
        {/* {type==='Cover' && <Cover cover={this.props.cover} onClose={this.props.onClose} setCoverColor={this.props.setCoverColor}/>} */}
        {type === 'Dates' && (
          <Dates onClose={this.props.onClose} saveDate={this.saveDate}/>
        )}
      </div>
    );
  }
}
