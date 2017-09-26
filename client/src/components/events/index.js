import React from 'react';
import EventRow from './eventRow';

export default (props) => {
    if(props.events.length<1){
        return <h1 className="text-center">Loading</h1>
    }
    return (
        <div>
            <EventRow event={props.events[0]}/>
            <EventRow event={props.events[1]}/>
            <EventRow event={props.events[2]}/>
        </div>
    );
}