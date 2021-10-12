import React from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
// import {moment} from 'moment'


export default function MyDTPicker(props) {
  return <Datetime style={{width:100 + '%'}} input={ false } onChange={(ev)=>props.handleChange(ev)}/>;
}
