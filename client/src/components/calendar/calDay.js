import React, { Component } from 'react';

class CalDay extends Component {
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.event);
        return (
            <td>1</td>
        )
    }
}

export default CalDay;