$(document).ready(init);

var client_id = "3077846337-cirpjmer7f42bk4gmmuamnftgkqpd2f4.apps.googleusercontent.com";
var googleCalendar = null;

function init(){
    var cal = new Calendar();
    cal.generate();
    applyClickHandlers();
    inactiveDays();
    googleCalendar = new GoogleCalendar(client_id, $("#auth_button"), $("#logout_button"), grabData);
    $("#refresh_button").on("click",googleCalendar.refreshNow);
}

function grabData(eList){
    //Passes the replace_template which holds the event data from google calendar.
    //eList is the multidimensional array coming from google calendar init.
    //Dynamically output the event with the correct date on the calendar using jQuery.
    //Give them class names such as avatar, logo, date, and name.
    console.log( eList );
    $('.calDay').map(function(index, date){
        if ($(date).text() === '2'){
            return $(date).html('2' + eList['0'].date);
        }
    })
}

function applyClickHandlers () {
    $('.calendar').on('click', '.fa-angle-left', function(){
        var cal = new Calendar(--currentMonth, currentYear);
        $(".calTable:nth-child(1)").remove();
        cal.generate();
        inactiveDays();
    });

    $('.calendar').on('click', '.fa-angle-right', function(){
        var cal = new Calendar(++currentMonth, currentYear);
        $(".calTable:nth-child(1)").remove();
        cal.generate();
        inactiveDays();
    });

    $('.calendar').on('click', '.calDay', function(){
        $('.modal').modal('show')
    })

}

function inactiveDays () {
    $('.calDay').map(function(index, date){
        if ($(date).text() === ''){
            return $(date).toggleClass('inactive');
        }
    })
}

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

function Calendar(month, year) {
    this.month = (isNaN(month) || month === null) ? currentMonth : month;
    this.year  = (isNaN(year) || year === null) ? currentYear : year;
}

Calendar.prototype.generate = function(){

        var firstDay = new Date(this.year, this.month, 1);
        var startingDay = firstDay.getDay();
        var monthLength = daysInMonth(this.year, this.month);
        var monthName = monthLabels[this.month];

        var table = $('<table class="calTable">');
        var tBody = $('<tbody>');
        var tableRow = $('<tr class="calMonth">');
        var colspan = $('<th colspan="7">');

        $('.calendar').append(table);
        table.append(tBody);
        tBody.append(tableRow);
        tableRow.append(colspan);

        var leftArrow = '<i class="fa fa-angle-left" aria-hidden="true"></i>';
        var rightArrow ='<i class="fa fa-angle-right" aria-hidden="true"></i>';
        colspan.html(leftArrow + ' ' + monthName + ' ' + this.year + ' ' + rightArrow);

        var calendarHeader = $('<tr class="calHeaderRow">');
        tBody.append(calendarHeader);

        for(var i = 0; i <= 6; i++ ){
            var calendarHeaderDay = $('<td class="calHeaderDay">');
            calendarHeaderDay.text(dayLabels[i]);
            calendarHeader.append(calendarHeaderDay);
        }

        var day = 1;
        var calendarDayRow = '<tr class="calDayRow">';

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j <= 6; j++) {
                var calendarDay = '<td class="calDay">';

                if (day <= monthLength && (i > 0 || j >= startingDay)) {
                    calendarDay += day;
                    day++;
                }
                calendarDayRow += calendarDay;
            }

            if (day > monthLength) {
                break;
            } else {
                calendarDayRow += '<tr class="calDayRow">';
            }
        }
        tBody.append(calendarDayRow);
    };