import React, { Component } from 'react';

class CalDay extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let event = this.props.event;
        if(event){
            return (
                <td className="calDay" onClick={()=>this.props.onClick(event)}><img className="avatar" src={event.avatar}/></td>
            )
        }else{
            return (
                <td className="calDay">{this.props.date}</td>
            )
        }

    }
}

export default CalDay;