/*input example :
Today's speaker is #name:James#
whatever i want to write #logo:http://someurl.jpg# hell yes
#protrait:http://some.jpg#

return an object, example:
{
    description: some description,
    property1: value1,
    property2: value2
}
*/

function hashtag_parser(str){
    var result = {};
    var key = "#";
    var separator = ":";
    var hashTagArr = [];
    var properties = [];
    var values = [];

    //maybe we can exclude "#"" with a "/", before we split the str
    //or change another way to do this without use the split function
    var arr = str.split(key);
    var description = [];
    for(var i = 0; i < arr.length; i++){
        if(i%2 === 0){
            description.push(arr[i]);
        }else{
            hashTagArr.push(arr[i]);
        }
    }
    result.description = description.join("");

    for(var i = 0; i < hashTagArr.length; ++i){
        var hastagStr = hashTagArr[i];
        var sIndex = hastagStr.indexOf(separator);
        properties.push(hastagStr.slice(0,sIndex));
        values.push(hastagStr.slice(sIndex));
    }

    for(var i = 0; i < properties.length; ++i){
        result[properties[i]] = values[i];
    }

    console.log(result);
    return result;
}