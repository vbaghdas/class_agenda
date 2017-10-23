import React, {Component} from 'react';
import Modal from './modal';
import CalDay from './calDay';
import CalendarCSS from './calendar.css';
import {connect} from 'react-redux';
import {setGestureCallback, enableGesture, changeGestureMode} from '../../actions';

class Calendar extends Component{
    constructor(props){
        super(props);
        
        this.onGesture = this.onGesture.bind(this);
        this.calDay = this.calDay.bind(this);
        this.getCurrentSelectEvent = this.getCurrentSelectEvent.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.previousMonth = this.previousMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);

        let now = new Date();
        this.sunday = 0;
        this.rowsCount = 5;
        this.weekLength = 7;
        this.monthLength = 3;

        this.state = { 
            modelIsOpen: false,
            currentSelectDate: now,
         };
    }

    getCurrentSelectEvent(){
        let {eventList, currentSelectDate} = this.props;
        for(let i = 0; i < eventList.length; ++i){
            if(eventList[i].formattedDate.toDateString() === this.state.currentSelectDate.toDateString()){
                return eventList[i];
            }
        }
        return null;
    }

    componentWillMount(){
        this.props.setGestureCallback(this.onGesture);
        this.setState(this.state.currentSelectDate);
    }

    onGesture(cmd){
        switch(cmd){
            case "enter":
                this.toggleModal(this.getCurrentSelectEvent());
                setTimeout( ()=> { this.props.enableGesture(true) }, 1000);
                return;
            case "cancel":
                if(this.state.modelIsOpen){
                    this.toggleModal();
                }else{
                    this.props.history.push("/");
                }
                setTimeout( ()=> { this.props.enableGesture(true) }, 1000);
                return;
        }

        if(!this.state.modelIsOpen){
            switch(cmd){
                case "-x":
                    this.goDirection("left");
                    break;
                case "x":
                    this.goDirection("right");
                    break;
                case "z":
                    this.goDirection("down");
                    break;
                case "-z":
                    this.goDirection("up");
                    break;
            }
        }

        setTimeout( ()=> { this.props.enableGesture(true) }, 500);
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
                offset = this.weekLength;
                break;
            case "up":
                offset = -this.weekLength;
                break;
        }
        this.changeDate(false, offset);
    };

    changeDate(isMonth, offset){
        let {currentSelectDate} = this.state;
        isMonth? currentSelectDate.setMonth(currentSelectDate.getMonth()+offset) : currentSelectDate.setDate(currentSelectDate.getDate()+offset);
        if(currentSelectDate.getTime()< this.props.startDate.getTime() || currentSelectDate.getTime() > this.props.endDate.getTime() ){
            console.log("out of calendar range, that's not gonna work");
            isMonth? currentSelectDate.setMonth(currentSelectDate.getMonth()-offset) : currentSelectDate.setDate(currentSelectDate.getDate()-offset);
            return;
        }
        this.setState(currentSelectDate);
    }

    previousMonth() {
        this.changeDate(true, -1);
    }
    nextMonth() {
        this.changeDate(true, +1);
    }


    toggleModal = (event) => {
        if(event === null){return};
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
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
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
        for(let i = 0; i < this.weekLength * this.rowsCount; ++i){
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
            rowArr.push(dayArr.splice(0, this.weekLength));
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
                            <tr className="calMonth">
                                <td className="material-icons" onClick={this.previousMonth}>arrow_back</td>
                                    {this.calMonth()}
                                <td className="material-icons" onClick={this.nextMonth}>arrow_forward</td>
                            </tr>
                            <tr className="calHeaderRow">{this.calHeader()}</tr>
                            {this.calDay()}
                        </tbody>
                    </table>
                    <Modal show={this.state.modelIsOpen} onClose={this.toggleModal} event={this.state.currentSelectEvent}></Modal>
                </div>
            );
        }else{
            return (
                <div className="calendar">
                    <h1 className="text-center mt-5">Loading...</h1>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    let {eventList, startDate, endDate} = state.eventList;
    return{
        eventList: eventList,
        startDate: startDate,
        endDate: endDate
    }
};

export default connect(mapStateToProps, {setGestureCallback, enableGesture})(Calendar);