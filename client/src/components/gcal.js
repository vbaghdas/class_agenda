import request from 'superagent';

const CALENDAR_ID = 'final.project.lfz@gmail.com';
const API_KEY = 'AIzaSyDTmFMqAgAqD4vq3srRgmA3mRuqz_fAljY';
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

export function getEvents (callback) {
    request
        .get(url)
        .end((err, resp) => {
            if (!err) {
                const events = [];
                JSON.parse(resp.text).items.map((event) => {
                    console.log('this is the event', event)
                    events.push({
                        start: event.start.date || event.start.dateTime,
                        end: event.end.date || event.end.dateTime,
                        title: event.summary,
                    })
                });
                callback(events)
            }
        })
}