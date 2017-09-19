$(document).ready(init);

var client_id = "3077846337-cirpjmer7f42bk4gmmuamnftgkqpd2f4.apps.googleusercontent.com";
var googleCalendar = null;

function init(){
    var cal = new Calendar();
    cal.generate();
    applyClickHandlers();
    inactiveDays();
    googleCalendar = new GoogleCalendar(client_id, $("#auth_button"), $("#logout_button"), Display);
    $("#refresh_button").on("click",googleCalendar.refreshNow);
}

function logCurrentEvent(eventlist){

    console.log(eventlist);
}


function Display(eventList){
    var dataListObject = {};
     for(var i = 0; i < eventList.length; ++i) {
         dataListObject['avatar'+i] = eventList[i].avatar;
         dataListObject['logo'+i] = eventList[i].logo;
         dataListObject['date'+i] = eventList[i].date;
         dataListObject['name'+i] = eventList[i].name;
         dataListObject['facility'+i] = eventList[i].facility;
         dataListObject['location'+i] = eventList[i].location;

     }


    var elements = $("body *:not(script)");
    elements.each(function(){
            var innerText = $(this)[0].innerText;

            var searchRegex = /{(.*)}/g;
            //if match is found assign it to matchesArray
            var matchesArray = innerText.match(searchRegex);
            //check for a match

            if(matchesArray!==null && matchesArray.length === 1) {
                //when match is found strip off curly braces and assign to entry
                var entry = matchesArray[0].slice(1, -1);
                //check eventList id an entry exist and if so the current elements html is fed the eventList item
                if (dataListObject[entry]) {
                    $(this).html(dataListObject[entry]);
                }
            }
    });

}



