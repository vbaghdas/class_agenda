import request from 'superagent';
import EventData from './event_data';
import option from './google_calendar_config';

export default class GoogleCalendar{
    constructor(callback){
        this.option = option;
        this.callback = callback;
        this.getString = this.getString.bind(this);
        this.load = this.load.bind(this);
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
                    this.callback(events)
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
}