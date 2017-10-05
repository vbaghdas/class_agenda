import React, { Component } from 'react';
import {enableGesture, enableGestureControlPage} from '../../actions';
import {connect} from 'react-redux';

class LeapMotion extends Component{
    constructor(props){
        super(props);
        this.options = {
            frameEventName: "deviceFrame"
        };

        this.timeStamp = null;
        
        //maybe should move below to componentWillMount
        this.controller = Leap.loop(this.options, (frame)=> {
            let {enable, controllable} = this.props;
            if(!enable) return;
            let hands = frame.hands;
            if(!controllable){
                if(this.isPraying(hands)){
                    console.log("success again");
                    this.props.enableGestureControlPage(true);
                }
            }else{
                if(hands.length>0) {
                    if(this.props.gamemode){
                        this.detectGameMode(hands);
                    }else{
                        this.detectPosition(hands[0]);
                    }
                    
                    this.timeStamp = parseInt(new Date().getTime()/1000);
                }else{
                    var count = parseInt(new Date().getTime()/1000);
                    count = count - this.timeStamp;
                    console.log(count);
                    if(count>=20){
                        this.props.enableGestureControlPage(false);
                    }
                }
                //if hands out, count down to 20, then set controllable to false
            }
        });
    }

    componentWillMount(){
        this.props.enableGesture(true);
    }

    isPraying(hands){
        let result = false;
        let min = 1000;
        if(hands.length>1){
            for(let i = 0; i < hands.length; ++i){
                for(let j = 0; j < hands.length; ++j){
                    if(i === j) continue;
                    const dotProduct = this.getDot(hands[i].palmNormal, hands[j].palmNormal);
                    if(dotProduct <-0.5){
                        const distance = this.getDistance(hands[i].palmPosition, hands[j].palmPosition);
                        min = distance < min? distance: min;
                        if(min<50 ){
                            console.log("success");
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    getDistance(pos1,pos2){
        let x = pos1[0] - pos2[0];
        let y = pos1[1] - pos2[1];
        let z = pos1[2] - pos2[2];
        return Math.sqrt(x*x+y*y+z*z);
    }

    getDot(pos1,pos2){
        return pos1[0]*pos2[0] + pos1[1]*pos2[1] + pos1[2]*pos2[2];
    }

    isMovingFast(velocity){
        return Math.max(Math.abs(velocity[0]),Math.abs(velocity[1]), Math.abs(velocity[2])) > 1500;
    }


    detectGameMode(hands){

        if(hands.length===1){
            if(hands[0].palmPosition[2] < -150 && this.isMovingFast(hands[0].palmVelocity)){
                console.log("did cancel");
                this.props.callback("cancel");
                return;
            }
        }

        let leftest = hands[0];
        let rightest = hands[0];
        for(let i = 1; i < hands.length; ++i){
            if(hands[i].palmPosition[0] < leftest.palmPosition[0]){
                leftest = hands[i];
            }
            if(hands[i].palmPosition[0] > rightest.palmPosition[0]){
                rightest = hands[i];
            }
        }

        this.props.callback(leftest.palmPosition,rightest.palmPosition);
    }

    detectPosition(hand){
        let cmd = "";
        let detected = false;
        let x = hand.palmPosition[0];
        let y = hand.palmPosition[1];
        let z = hand.palmPosition[2];

        if(z > 150 && this.isMovingFast(hand.palmVelocity)){
            cmd += "enter";
            console.log("success enter");
            detected = true;
        }else if(z < -150 && this.isMovingFast(hand.palmVelocity)){
            cmd += "cancel";
            console.log("success cancel");
            detected = true;
        }else if(x < -300){
            cmd += "-x";
            detected = true;
        }else if(x > 300){
            cmd += "x";
            detected = true;
        }else if(y < 300){
            cmd += "-y";
            detected = true;
        }else if(y > 600){
            cmd += "y";
            detected = true;
        }

        if(detected){
            this.props.callback(cmd);
            this.props.enableGesture(false);
        }
    }

    render(){
        return (
            <div></div>
        );
    }
}


const mapStateToProps = state =>{
    var {leap} = state;
    return {
        enable: leap.enable,
        callback: leap.callback,
        controllable: leap.controllable,
        gamemode: leap.gamemode
    };
}


export default connect(mapStateToProps, {enableGesture, enableGestureControlPage})(LeapMotion);