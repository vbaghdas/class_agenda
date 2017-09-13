$(document).ready(init);

var client_id = "3077846337-cirpjmer7f42bk4gmmuamnftgkqpd2f4.apps.googleusercontent.com";
var calender = null;

function init(){
    calendar = new Calendar(client_id, $("#auth_button"), $("#logout_button"), logCurrentEvent);
}

function logCurrentEvent(eventlist){
    console.log(eventlist);
}