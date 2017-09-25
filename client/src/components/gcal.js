import request from 'superagent';
import EventData from './event_data';

const CALENDAR_ID = 'final.project.lfz@gmail.com';
const API_KEY = 'AIzaSyDTmFMqAgAqD4vq3srRgmA3mRuqz_fAljY';

var url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`;
var key = `?key=${API_KEY}`;

export function getEvents (callback) {
    request
        .get(url+key)
        .end((err, resp) => {
            if (!err) {
                const events = [];
                JSON.parse(resp.text).items.map((event) => {
                    console.log('this is the event', event)
                    events.push(new EventData(event));
                });
                callback(events)
            }
        })
}