function Calendar(client_id){

    var CLIENT_ID = null;
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar";
    var auth_button = null;
    var logout_button = null;
    var GoogleAuth = null;

    function init(){
        CLIENT_ID = client_id;
        gapi.load('client:auth2', initClient);
        auth_button = $("#auth_button");
        logout_button = $("#logout_button");
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
            auth_button.on("click", onAuthButtonClick);
            logout_button.on("click", onLogoutButtonClick);
        });
    }

    function updateSigninStatus(isSignedIn){
        if(isSignedIn){
            console.log("signed")
            listUpcomingEvents();
        }else{
            console.log("not signed");
        }
    }

    function onAuthButtonClick(){
        GoogleAuth.signIn();
    }

    function onLogoutButtonClick(){
        GoogleAuth.signOut();
    }


    //two month event from now
    //max 10 result
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
    
            if (events.length > 0) {
                for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    var when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }
                    console.log("event = ", event);
                    console.log(event.summary + " " + when );
                }
            } else {
                console.log('No upcoming events found.');
            }
        });
    }

    init();
}



