import { display } from '@mui/system';
import React from 'react';
export class Cover extends React.Component {
  state = {};
  colorOptions = [
    '#7BC86C',
    '#F5DD29',
    '#FFAF3F',
    '#EF7564',
    '#CD8DE5',
    '#5BA4CF',
    '#29CCE5',
    '#6DECA9',
    '#FF8E',
    '#172B4D',
  ];
 
  render() {
 
    return (
      <div className={'cover-container '+`${this.props.cover}`}
       >
        <header>
          <h1>Cover</h1>
          <button onClick={() => this.props.onClose()}>X</button>
          <hr />
        </header>
        <main className={'cover-main flex'}>
            {this.colorOptions.map((color)=>{
             return  <button className={'cover-color-btn'} key={color} style={{backgroundColor:color}} onClick={()=>{this.props.setCoverColor(color)}}></button>
            })}
        </main>
      </div>
    );
  }
}
