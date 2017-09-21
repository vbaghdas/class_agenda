function replace_template(targetArray, sourceList){
    var dataListObject = {};
    for(var s in sourceList) {
        for(var e in sourceList[s]){
            dataListObject[e+s] = sourceList[s][e];
        }

    }
    targetArray.each(function(){
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