import React, {Component} from 'react';
import Modal from './modal';
import CalDay from './calDay';


class Calendar extends Component{
    constructor(props){
        super(props);
        var date = new Date();
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth();
        this.currentDate = date.getDate();
        this.currentDay = date.getDay();
        this.now = new Date();
        this.state = { isOpen: false };
    }

    toggleModal = () => {
        this.setState({
              isOpen: !this.state.isOpen
        });
    };

    createRows(){
        var date = new Date();
        date.setDate(1);
        var sunday = 0;
        var offset = sunday - date.getDay();
        var startDate = new Date(date.getFullYear(), date.getMonth(), 1+offset);
        var rowsCount = 5;
        var weeklength = 7;
        var dayArr = [];

        for(let i = 0; i < weeklength * rowsCount; ++i){
            dayArr.push({date:startDate.getDate(),month:9});
            startDate.setDate(startDate.getDate()+1);
        }

        dayArr = dayArr.map((item,index)=>{
            let targetEvent = null;
            let events = this.props.events;
            for(let i = 0; i < events.length; ++i){
                console.log("event month",events[i].formattedDate.getMonth() );
                console.log("calDay month",item.month);
                if(events[i].formattedDate.getMonth() === item.month && events[i].formattedDate.getDate() === item.date){
                    targetEvent = events[i];
                    console.log("targetEvent",targetEvent);
                }
            }
            return <CalDay className="calDay" key={index}  onClick={this.toggleModal} event={targetEvent}>{item.date}</CalDay>
        });

        var rowArr = [];
        for(let i = 0; i < rowsCount; ++i){
            rowArr.push(dayArr.splice(0,weeklength));
        }
        rowArr = rowArr.map((item,index)=>{
            return (
            <tr className="calDayRow" key = {index}>
                    {item}
            </tr>
            );
        });
        return rowArr;
    }

    render() {
        return (
            <div className="calendar">
                <table>
                    <tbody>
                        <tr className="calMonth"></tr>
                        <tr className="calHeaderRow"></tr>
                        {this.createRows()}
                    </tbody>
                </table>
                <Modal show={this.state.isOpen}
                       onClose={this.toggleModal}>
                </Modal>
            </div>
        )
    }
}

export default Calendar;