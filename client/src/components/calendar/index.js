import React, {Component} from 'react';


class Calendar extends Component{
    constructor(props){
        super(props);


    }

    createRow(){
        return (
            <tr className="calDayRow"></tr>
        )
    }

    render() {
        return (
            <div className="calendar">
                <table>
                    <tbody>
                        <tr className="calMonth"></tr>
                        <tr className="calHeaderRow"></tr>
                        <tr className="calDayRow">
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                        </tr>
                        <tr className="calDayRow">
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                        </tr>
                        <tr className="calDayRow">
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                        </tr>
                        <tr className="calDayRow">
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                        </tr>
                        <tr className="calDayRow">
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                            <td className="calDay"></td>
                        </tr>
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