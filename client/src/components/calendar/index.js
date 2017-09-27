import React, {Component} from 'react';


class Calendar extends Component{
    constructor(props){
        super(props);
        var now = new Date();
        this.currentYear = now.getFullYear();
        this.currentMonth = now.getMonth();
        this.currentDate = now.getDate();
        this.currentDay = now.getDay();
    }

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
            dayArr.push(startDate.getDate());
            startDate.setDate(startDate.getDate()+1);
        }

        dayArr = dayArr.map((item,index)=>{
            return <td className="calDay" key={index}>{item}</td>
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
            </div>
        )
    }
}

export default Calendar;


var dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var monthLabels = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
];

var currentDate = new Date();
var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

function daysInMonth(year, month) {
    return (new Date(year, ++month, 0)).getDate();
}

function createCalendar(month, year) {
    this.month = (isNaN(month) || month === null) ? currentMonth : month;
    this.year  = (isNaN(year) || year === null) ? currentYear : year;
}

function generateCalendar(){
        var firstDay = new Date(this.year, this.month, 1);
        var startingDay = firstDay.getDay();
        var monthLength = daysInMonth(this.year, this.month);
        var monthName = monthLabels[this.month];

        for(var i = 0; i <= 6; i++ ){
            var calendarHeaderDay = $('<td class="calHeaderDay">');
            calendarHeaderDay.text(dayLabels[i]);
            calendarHeader.append(calendarHeaderDay);
        }

        var day = 1;
        var calendarDayRow = '<tr class="calDayRow">';
};