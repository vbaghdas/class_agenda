import React, {Component} from 'react';
import EventRow from './eventRow';
import EventCSS from './event.css';
import {connect} from 'react-redux';
import {setGestureCallback, enableGesture} from '../../actions';

class Events extends Component {

    constructor(props){
        super(props);
        this.onGesture = this.onGesture.bind(this);
        this.getRows = this.getRows.bind(this);
        this.maxResult = 3;
    }

    componentWillMount(){
        this.props.setGestureCallback(this.onGesture);
    }

    onGesture(cmd){
        if(cmd === "cancel"){
            this.props.history.push("/");
        }
        setTimeout(()=>this.props.enableGesture(true),1000);
    }

    getRows(){
        let {eventList} = this.props;
        let rows = [];
        if(eventList){
            var i = 0;
            while(eventList[i] && i < this.maxResult){
                rows.push(eventList[i]);
                ++i;
            }
        }
        
        return rows.map((item,index)=>{
            return <EventRow event={item} key={index}/>
        });
    }
    

    render(){
        return(
            <div>
                {this.getRows()}
            </div>
        );   
    };
}

const mapStateToProps= state => {
    return{
        eventList: state.eventList.eventList
    };
};

export default connect(mapStateToProps, {setGestureCallback, enableGesture})(Events);