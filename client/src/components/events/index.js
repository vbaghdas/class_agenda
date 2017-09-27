import React from 'react';
import EventRow from './eventRow';

export default (props) => {
    if(!props.loaded){
        return <h1 className="text-center">Loading</h1>
    }

    var maxResult = 3;
    var rows = [];
    var i = 0;
    while(props.events[i] && i < maxResult){
        rows.push(props.events[i]);
        ++i;
    }
    console.log("rows:",rows);
    rows = rows.map((item,index)=>{
        return <EventRow event={item} key={index}/>
    });

    return (
        <div>
            {rows}
        </div>
    );
}