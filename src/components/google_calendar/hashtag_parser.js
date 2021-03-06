/* Input Example :

You can insert descriptions in this format : #someProperty:someValue#
For Example : #name:Vache#

Any # doesn't follow that format will just behave like a normal #

You can also use the same property name multiple times, and they will be saved into an array,
just like this ===> #logo:some.jpg# and #logo:other.jpg# 

And all the others text without that format will just go into the description property

return an object, example:
[object Object] {
  description: "some description    some other description  hahahahahah",
  logo: ["some.jpg", "other.jpg"],
  name: "James",
  someProperty: "someValue"
}
*/

export default function hashtag_parser(str){
    if(!str || str.constructor !== String){
        return null;
    }

    var result = {};
    var needToRemove = [];
    var properties = [];
    var values = [];

    var regex = /#([^#]*?):(.*?)#/g;
    var match = null;
    while(match = regex.exec(str)){
        needToRemove.push(match[0]);
        properties.push(match[1]);
        values.push(match[2])
    }
    for(var i = 0; i < needToRemove.length; ++i){
        str = str.replace(needToRemove[i],"");
    }

    result.description = str;
    for(var i = 0; i < properties.length; ++i){
        var prop = properties[i];
        if(result[prop]){
            if(result[prop].constructor === Array){
                result[prop].push(values[i]);
            }else{
                var arr = [];
                arr.push(result[prop]);
                arr.push(values[i]);
                result[prop] = arr;
            }
        }else{
            result[prop] = values[i];
        }
    }
    return result;
}