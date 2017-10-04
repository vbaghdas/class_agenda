import React, {Component} from 'react';
import Modal from './modal';
import CalDay from './calDay';
import {connect} from 'react-redux';
import {setGestureCallback, enableGesture, changeGestureMode} from '../../actions';

class Calendar extends Component{
    constructor(props){
        super(props);
        
        this.onGesture = this.onGesture.bind(this);
        this.calDay = this.calDay.bind(this);

        let now = new Date();
        this.sunday = 0;
        this.rowsCount = 5;
        this.weeklength = 7;

        this.state = { 
            modelIsOpen: false,
            currentSelectDate: now,
         };
    }

    componentWillMount(){
        this.props.setGestureCallback(this.onGesture);
        this.setState(this.state.currentSelectDate);
    }

    onGesture(cmd){
        let reset = false;
        switch(cmd){
            case "cancel":
                console.log("success go back to home");
                this.props.history.push("/");
                break;
            case "-x":
                this.goDirection("left");
                reset = true;
                break;
            case "x":
                this.goDirection("right");
                reset = true;
                break;
            case "-y":
                this.goDirection("down");
                reset = true;
                break;
            case "y":
                this.goDirection("up");
                reset = true;
                break;
            default:
                break;
        }
        setTimeout( ()=> { this.props.enableGesture(true) }, 400);

    }

    goDirection(direction){
        let offset = 0;
        switch(direction){
            case "right":
                offset = 1;
                break;
            case "left":
                offset = -1;
                break;
            case "down":
                offset = this.weeklength;
                break;
            case "up":
                offset = -this.weeklength;
                break;
        }
        this.state.currentSelectDate.setDate(this.state.currentSelectDate.getDate()+offset);
        this.setState(this.state.currentSelectDate);
    };

    toggleModal = (event) => {
        this.setState({
            modelIsOpen: !this.state.modelIsOpen,
            currentSelectEvent: event
        });
    };

    calMonth(){
        const monthsArr = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 
            'August', 'September', 'October', 'November', 'December'
        ];
        return <td> {monthsArr[this.state.currentSelectDate.getMonth()] + ' ' + this.state.currentSelectDate.getFullYear()} </td>;
    }

    calHeader(){
        let calHeaderRow = [
            'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
        ]
        return calHeaderRow.map((item,index)=>{
            return (
            <td className="calHeaderDay" key={index}>{item}</td>
            );
        });
    }

    calDay(){
        let startDate = new Date(this.state.currentSelectDate);
        startDate.setDate(1);
        let offset = this.sunday - startDate.getDay();
        startDate.setDate(1+offset);
        let dayArr = [];
        for(let i = 0; i < this.weeklength * this.rowsCount; ++i){
            // hard code the month
            dayArr.push(new Date(startDate));
            startDate.setDate(startDate.getDate()+1);
        }

        dayArr = dayArr.map((item,index)=>{
            let targetEvent = null;
            let events = this.props.eventList;
            let selected = false;
            for(let i = 0; i < events.length; ++i){
                let eventDate = events[i].formattedDate;

                if(eventDate.toDateString() === item.toDateString()){
                    targetEvent = events[i];
                }
            }

            let selectDate = this.state.currentSelectDate;
            if(item.toDateString() === selectDate.toDateString()){
                selected = true;
            }
            return <CalDay key={index}  onClick={this.toggleModal} date={item} event={targetEvent} selected={selected}></CalDay>
        });

        let rowArr = [];
        for(let i = 0; i < this.rowsCount; ++i){
            rowArr.push(dayArr.splice(0, this.weeklength));
        }
        rowArr = rowArr.map((item,index)=>{
            return (
            <tr className="calDayRow" key = {index}>{item}</tr>
            );
        });
        return rowArr;
    }

    render() {
        if(this.props.eventList){
            return (
                <div className="calendar">
                    <table>
                        <tbody>
                            <tr className="calMonth">{this.calMonth()}</tr>
                            <tr className="calHeaderRow">{this.calHeader()}</tr>
                            {this.calDay()}
                        </tbody>
                    </table>
                    <Modal show={this.state.modelIsOpen} onClose={this.toggleModal} event={this.state.currentSelectEvent}>
                    </Modal>
                </div>
            );
        }else{
            return (
                <div className="calendar">
                    <h1 className="text-center mt-5">Loading</h1>
                </div>
            );
        }
        
    }
}

const mapStateToProps = state => {
    return{
        eventList: state.eventList.eventList
    }
};

export default connect(mapStateToProps, {setGestureCallback, enableGesture})(Calendar);