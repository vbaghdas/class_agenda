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
    var arr = $(".avatarContainer");
    console.log(arr);
    for(var i = 0; i < eventList.length; ++i){
        console.log(eventList[i].avatar);
        $(arr[i]).append($("<img class='avatar'>").attr("src",eventList[i].avatar));
    }
}

// function foo() {
//     $(document).ready(init);
//     function init() {
//         findTags(dataObject);
//     };
//     var dataObject = {
//         avatar: "<img src='https://pbs.twimg.com/profile_images/465918286257868800/61etP8rK.jpeg'>",
//         event: 'Marv Chan comes to LFZ',
//         date: 'Meet Marv and the LFZ team, 3 people employed at KBB'
//     };
//     function findTags(fields){
//         var elements = $("body *:not(script):not(img):not(iframe)");
//         elements.each(function(){
//             var innerText = $(this)[0].innerText;
//             var searchRegex = /{(.*)}/g;
//             var matchesArray = innerText.match(searchRegex);
//             if(matchesArray.length===1){
//                 var entry = matchesArray[0].slice(1,-1);
//                 if(fields[entry]){
//                     $(this).html(fields[entry]);
//                 }
//             }
//         });
//     }
// }


$('document').ready(function(){

});