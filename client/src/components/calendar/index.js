import React, {Component} from 'react';
import Modal from './modal';
import CalDay from './calDay';


class Calendar extends Component{
    constructor(props){
        super(props);

        const date = new Date();

        this.state = { 
            isOpen: false,
            date: new Date(),
            currentYear: date.getFullYear(),
            currentMonth: date.getMonth(),
            sunday: 0,
            rowsCount: 5,
            weeklength: 7,
         };
    }

    toggleModal = (event) => {
        this.setState({
            isOpen: !this.state.isOpen,
            currentSelectEvent: event
        });
    };

    calMonth(){
        const monthsArr = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 
            'August', 'September', 'October', 'November', 'December'
        ];
        return monthsArr[this.state.currentMonth] + ' ' + this.state.currentYear;
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
        const { date, sunday,rowsCount, weeklength } = this.state;
        date.setDate(1);
        let offset = sunday - date.getDay();
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1+offset);
        let dayArr = [];

        for(let i = 0; i < weeklength * rowsCount; ++i){
            // hard code the month
            dayArr.push({date:startDate.getDate(),month:startDate.getMonth()+1});
            startDate.setDate(startDate.getDate()+1);
        }

        dayArr = dayArr.map((item,index)=>{
            let targetEvent = null;
            let events = this.props.events;
            for(let i = 0; i < events.length; ++i){
                if(events[i].formattedDate.getMonth() === item.month && events[i].formattedDate.getDate() === item.date){
                    targetEvent = events[i];
                }
            }
            return <CalDay key={index}  onClick={this.toggleModal} date={item.date} event={targetEvent}></CalDay>
        });

        let rowArr = [];
        for(let i = 0; i < rowsCount; ++i){
            rowArr.push(dayArr.splice(0,weeklength));
        }
        rowArr = rowArr.map((item,index)=>{
            return (
            <tr className="calDayRow" key = {index}>{item}</tr>
            );
        });
        return rowArr;
    }

    render() {
        return (
            <div className="calendar">
                <table>
                    <tbody>
                        <tr className="calMonth">{this.calMonth()}</tr>
                        <tr className="calHeaderRow">{this.calHeader()}</tr>
                        {this.calDay()}
                    </tbody>
                </table>
                <Modal show={this.state.isOpen} onClose={this.toggleModal} event={this.state.currentSelectEvent}>
                </Modal>
            </div>
        )
    }
}

export default Calendar;