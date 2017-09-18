$(document).ready(init);

var client_id = "3077846337-cirpjmer7f42bk4gmmuamnftgkqpd2f4.apps.googleusercontent.com";
var googleCalendar = null;

function init(){
    googleCalendar = new GoogleCalendar(client_id, $("#auth_button"), $("#logout_button"), logCurrentEvent);
    $("#refresh_button").on("click",googleCalendar.refreshNow);
}

function logCurrentEvent(eventlist){
    
    console.log(eventlist);
}