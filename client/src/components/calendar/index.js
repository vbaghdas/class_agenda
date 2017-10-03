import React, {Component} from 'react';
import Modal from './modal';
import CalDay from './calDay';
import VirtualCalendar from './virtual_calendar';
import {connect} from 'react-redux';

class Calendar extends Component{
    constructor(props){
        super(props);
        
        let now = new Date();
        this.sunday = 0;
        this.rowsCount = 5;
        this.weeklength = 7;

        this.state = { 
            modelIsOpen: false,
            currentShowDate: now,
         };
    }

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
        return <td> {monthsArr[this.state.currentShowDate.getMonth()] + ' ' + this.state.currentShowDate.getFullYear()} </td>;
    }

    calHeader(){
        let calHeaderRow = [
            'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
        ]
        return calHeaderRow.map((item,index)=>{
            return (
            <td className="calHeaderDay" key={index}>{item}</td>
            );
        });
    }

    calDay(){
        let startDate = new Date(this.state.currentShowDate);
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
            for(let i = 0; i < events.length; ++i){
                if(events[i].formattedDate.getFullYear() === item.getFullYear()
                   && events[i].formattedDate.getMonth() === item.getMonth() 
                   && events[i].formattedDate.getDate() === item.getDate()){
                    targetEvent = events[i];
                }
            }
            return <CalDay key={index}  onClick={this.toggleModal} date={item} event={targetEvent}></CalDay>
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
                    <VirtualCalendar />
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
        eventList: state.eventList.eventList,
    }
};

export default connect(mapStateToProps)(Calendar);