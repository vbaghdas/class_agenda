
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {enableGesture} from '../../actions';
import {setGestureCallback} from '../../actions';
import {selectDate} from '../../actions';

class VirtualCalendar extends Component{
    constructor(props){
        super(props);
        this.now = new Date();
        this.currentSelectDate = new Date();
        this.onGesture = this.onGesture.bind(this);
        this.props.selectDate(this.currentSelectDate);
    }

    componentWillMount(){
        this.props.setGestureCallback(this.onGesture);
    }

    onGesture(cmd){
        if(cmd === "swipe_-x"){
            this.goBackward();
            setTimeout( ()=> { this.props.enableGesture(true) }, 100);
        }else if(cmd === "swipe_x"){
            this.goForward();
            setTimeout( ()=> { this.props.enableGesture(true) }, 100);
        }
    }

    goForward(){
        this.currentSelectDate.setDate(this.currentSelectDate.getDate()+1);
        this.props.selectDate(this.currentSelectDate);
    }

    goBackward(){
        this.currentSelectDate.setDate(this.currentSelectDate.getDate()-1);
        this.props.selectDate(this.currentSelectDate);
    }

    render(){
        return (
            <div></div>
        );
    }
}

export default connect(null,{enableGesture, setGestureCallback, selectDate})(VirtualCalendar);