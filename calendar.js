//the onloaded callback will execute every {refreshTime} seconds
//TODO make the parameter an object will be better?
function Calendar(client_id, signIn_button, signOut_button, onloaded){

    var CLIENT_ID = null;
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar";
    var GoogleAuth = null;
    var interval_id = null;
    var currentLoadedEventList = [];
    var self = this;
    this.signIn_button = null;
    this.signOut_button = null;
    this.isSignedIn = false;
    this.currentLoadedEventData = [];
    this.onloaded = null;
    this.calendar_id = "";
    //how many days gonna load
    this.loadLength = 90; 
    this.maxResults = 10;
    this.refreshTime = 10;//sec
    this.refreshNow = function(){
        if(self.isSignedIn){
            clearInterval(interval_id);
            if(!isNaN(self.refreshTime)){
                interval_id = setInterval(loadEvents,self.refreshTime*1000);
            }
            loadEvents();
        }
    }

    function init(){
        CLIENT_ID = client_id;
        gapi.load('client:auth2', initClient);
        self.signIn_button = signIn_button;
        self.signOut_button = signOut_button;
        self.onloaded = onloaded
        self.calendar_id = "primary";
    }

    function initClient() {
        gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(function () {
            GoogleAuth = gapi.auth2.getAuthInstance();
            GoogleAuth.isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(GoogleAuth.isSignedIn.get());
            signIn_button.on("click", onSignInButtonClick);
            signOut_button.on("click", onSignOutButtonClick);
        });
    }

    function updateSigninStatus(isSignedIn){
        if(isSignedIn){
            self.isSignedIn = true;
            console.log("signed")
            loadEvents();
            if(!isNaN(self.refreshTime)){
                interval_id = setInterval(loadEvents,self.refreshTime*1000);
            }
        }else{
            self.isSignedIn = false;
            self.currentLoadedEventData = [];
            clearInterval(interval_id);
            console.log("not signed");
        }
    }

    function onSignInButtonClick(){
        GoogleAuth.signIn();
    }

    function onSignOutButtonClick(){
        GoogleAuth.signOut();
    }

    //two month event from now
    //max 10 result
    //TODO make an callback as parameter, and execute the callback when finished loaded
    function loadEvents() {
        var currentDate = new Date();
        var maxDate = new Date();
        maxDate.setDate(currentDate.getDate()+self.loadLength);
        gapi.client.calendar.events.list({
            'calendarId': self.calendar_id,
            'timeMax': maxDate.toISOString(),
            'timeMin': currentDate.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': self.maxResults,
            'orderBy': 'startTime'
        }).then(function(response) {
            var events = response.result.items;
            self.currentLoadedEventData = [];
            if (events.length > 0) {
                for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    console.log(event);
                    var loadedData = new Event_data(event);
                    self.currentLoadedEventData.push(loadedData);
                    //for test
                    /*
                    if(i == 0){
                        updateEvent(event.id, "description", "test update again and again");
                    }
                    */
                }
            } else {
                console.log('No upcoming events found.');
            }
            self.onloaded(self.currentLoadedEventData);
            
        });
    }

    function getEventDataByID(id){
        var data = self.currentLoadedEventData;
        for(var i = 0; i < data.length; ++i){
            if(data[i].id === id){
                return data[i];
            }
        }
        return null;
    }

    function updateEvent(eventid, propertyName, value){
        gapi.client.calendar.events.get({
            calendarId: self.calendar_id,
            eventId: eventid
        }).then(function(response){
            var event = response.result
            event[propertyName] = value;
            gapi.client.calendar.events.update({
                calendarId : self.calendar_id,
                eventId: eventid,
                resource: event
            }).then(function(response){
                getEventDataByID(response.result.id)[propertyName] = value;
            });
        });
    }

    init();
}



