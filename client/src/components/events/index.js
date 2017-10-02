import React from 'react';
import EventRow from './eventRow';
import {connect} from 'react-redux';

const Events =  (props) => {
    console.log(props.eventList);

    var maxResult = 3;
    var rows = [];
    var i = 0;
    while(props.eventList[i] && i < maxResult){
        rows.push(props.eventList[i]);
        ++i;
    }
    rows = rows.map((item,index)=>{
        return <EventRow event={item} key={index}/>
    });

    return (
        <div>
            {rows}
        </div>
    );
}

const mapStateToProps= state => {
    return{
        eventList: state.eventList.eventList
    };
};

export default connect(mapStateToProps)(Events);