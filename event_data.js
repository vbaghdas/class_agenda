
// if you want any data from the calendar
// plz declare it here
function Event_data(event){
    var self = this;
    this.id = null;
    this.description = null;
    this.name = null;
    this.avatar = null;

    function init(){
        //extract from event
        self.id = event.id;
        /*
        var when = event.start.dateTime;
        if (!when) {
            when = event.start.date;
        }
        */

        //extract from event description
        var description_object = hashtag_parser(event.description);
        for(var p in description_object){
            if(self.hasOwnProperty(p) && description_object[p]){
                self[p]= description_object[p];
            }
        }
    }

    init();
}