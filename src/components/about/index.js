import React, { Component } from 'react';
import Credits from './credits.css';
import { connect } from 'react-redux';
import { enableGesture, setGestureCallback } from '../../actions';

class About extends Component{
    constructor(props){
        super(props);
        this.onGesture = this.onGesture.bind(this);
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

    render(){
        return (
            <div className="credits-container">
                <div className='credits'>
                    <div className='project'>interactive calendar</div>
                    <div className='title'>directed by</div>
                    <div className='name'>vache baghdassarian</div>
                    <div className='title'>produced by</div>
                    <div className='name'>jen hao</div>
                    <div className='title'>screenplay by</div>
                    <div className='name'>carlos blandino</div>
                    <div className='title'>project manager</div>
                    <div className='name'>daniel paschal</div>
                    <div className='title'>special thanks to</div>
                    <div className='name'>leap motion technologies</div>
                </div>
            </div>
        );
    }
}

export default connect(null,{enableGesture,setGestureCallback})(About);
