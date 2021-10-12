
import React, {useRef} from 'react';
import MyDTPicker from '../cmps/TimeDatePicker'


export class Dates extends React.Component {
   state={
     selectedVal: Date().substring(0,25)
   }
   handleChange =(ev)=>{
     const selected = ev._d.toString().substring(0,25)
     this.setState({selectedVal:selected})
   }
  render() {
    return (
      <div  style={{
        backgroundColor: '#ffffff',
        zIndex: 1,
        contain: 'content',
        width: 'fit-content',
        position: 'fixed',
        right:21 + '%',
      
      }}>
        <header>
          <h1>Dates</h1>
          <button onClick={()=>this.props.onClose()}>X</button>
          <hr />
        </header>
        <main style={{ marginBlockStart:0}}>
        { <MyDTPicker  handleChange={this.handleChange}/>}
        <div>Selected: {this.state.selectedVal}</div>
        </main>
        <button onClick={()=>this.props.saveDate()}>Save Due Date!</button>
      </div>
    );
  }
}
   