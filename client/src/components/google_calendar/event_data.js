
// if you want any data from the calendar
// plz declare it here
import hashtag_parser from './hashtag_parser';

export default class Event_data{
    
    constructor(props){
        this.id = props.id;
        this.logo = null;
        this.avatar = null;
        this.name = null;
        this.date = null;
        this.facility = null;
        this.location = null;
        var when = props.start.dateTime;
        if (!when) {
            when = props.start.date;
        }
        this.formattedDate = new Date(when);
        this.description = props.description;
        this.parseDescription(props.description);
    }
    parseDescription(description){
        /*
        var when = event.start.dateTime;
        if (!when) {
            when = event.start.date;
        }
        */

        //extract from event description
        var description_object = hashtag_parser(description);
        for(var p in description_object){
            if(this.hasOwnProperty(p) && description_object[p]){
                this[p]= description_object[p];
            }
        }
    }
}