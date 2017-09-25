import request from 'superagent';
import EventData from './event_data';


export default class GoogleCalendar{
    constructor(props,callback){
        this.option = props;
        this.callback = callback;
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
        maxDate.setDate(currentDate.getDate()+this.option.loadLength);

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