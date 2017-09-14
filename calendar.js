
//
function Calendar(client_id, signIn_button, signOut_button, onloaded){

    var CLIENT_ID = null;
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar";
    var GoogleAuth = null;
    var self = this;
    this.signIn_button = null;
    this.signOut_button = null;
    this.isSignedIn = false;
    this.currentLoadedEventList = [];
    this.onloaded = null;
    this.refreshTime = 60 * 20;//sec

    function init(){
        CLIENT_ID = client_id;
        gapi.load('client:auth2', initClient);
        self.signIn_button = signIn_button;
        self.signOut_button = signOut_button;
        self.onloaded = onload
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
            listUpcomingEvents();
            setInterval(listUpcomingEvents,self.refreshTime*1000);
        }else{
            self.isSignedIn = false;
            console.log("not signed");
        }
    }

    function onSignInButtonClick(){
        GoogleAuth.signIn();
    }

    function onSignOutButtonClick(){
        GoogleAuth.signOut();
    }

    function getEventList(){
        return self.currentLoadedEventList;
    }

    //two month event from now
    //max 10 result
    //TODO make an callback as parameter, and execute the callback when finished loaded
    function listUpcomingEvents() {
        
        console.log(gapi.client.calendar.events);
        var currentDate = new Date();
        var maxDate = new Date();
        maxDate.setDate(currentDate.getDate()+60);
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMax': maxDate.toISOString(),
            'timeMin': currentDate.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function(response) {
            var events = response.result.items;
            self.currentLoadedEventList = [];
            if (events.length > 0) {
                for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    var when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }
                    
                    var description_object = hashtag_parser(event.description);
                    var loadedEvent = new Event_data();
                    for(var p in description_object){
                        if(loadedEvent.hasOwnProperty(p) && description_object[p]){
                            loadedEvent[p]= description_object[p];
                        }
                    }
                    self.currentLoadedEventList.push(loadedEvent);
                }
                onloaded(getEventList());
            } else {
                console.log('No upcoming events found.');
            }
        });
    }

    init();
}



