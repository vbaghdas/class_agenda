import React, { Component } from 'react';

class CalDay extends Component {
    constructor(props){
        super(props);
        this.state = {ishover:false};
        this.onHover = this.onHover.bind(this);
        this.onOut = this.onOut.bind(this);
    }


    onHover(){
        this.setState({ishover:true});
    }

    onOut(){
        this.setState({ishover:false});
    }

    render(){
        let event = this.props.event;
        if(event){
            return (
                <td className={this.state.ishover? "calDay enlarge": "calDay"}
                onMouseEnter={()=>this.onHover()} 
                onMouseLeave={()=>this.onOut()}
                onClick={()=>this.props.onClick(event)}><img className="avatar" src={event.avatar}/></td>
            )
        }else{
            return (
                <td className="calDay">{this.props.date}</td>
            )
        }

    }
}

export default CalDay;