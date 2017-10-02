import React, {Component} from 'react';
import option from './google_calendar_config';
import {connect} from 'react-redux';
import {refreshEventData} from '../../actions'
import request from 'superagent';
import EventData from './event_data';

class GoogleCalendar extends Component{

    constructor(props){
        super(props);
        this.option = option;
        this.getString = this.getString.bind(this);
        this.load = this.load.bind(this);
        this.load();
        setInterval(()=>this.load(), this.option.refreshTime * 1000);
    }

    load(){
        request
            .get(this.getString(this.option))
            .end((err, resp) => {
                if (!err) {
                    const events = [];
                    JSON.parse(resp.text).items.map((event) => {
                        events.push(new EventData(event));
                    });
                    this.props.refreshEventData(events);
                }
            })
    }

    getString(option){
        var currentDate = new Date();
        var maxDate = new Date();
        maxDate.setDate(currentDate.getDate()+option.loadLength);

        var result = "";
        result += `https://www.googleapis.com/calendar/v3/calendars/${option.calendar_id}/events`
        result += `?key=${option.api_key}`;
        result += `&maxResult=${option.maxResults}`;
        result += `&timeMin=${currentDate.toISOString()}`;
        result += `&timeMax=${maxDate.toISOString()}`;
        result == `&orderBy= 'startTime'`
        return result;
    }

    render(){
        return (
            <div></div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        eventList: state.eventList.eventList,
    };
}

export default connect(mapStateToProps, {refreshEventData} )(GoogleCalendar);