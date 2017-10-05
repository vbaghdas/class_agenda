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
        this.detectRange = 300;
        this.cancel_enter_sensitive = 1;
        this.gestureLockCountDown = 20;

        //maybe should move below to componentWillMount
        this.controller = Leap.loop(this.options, (frame)=> {
            let {enable, controllable} = this.props;
            if(!enable) return;
            let hands = frame.hands;
            if(!controllable){
                if(this.isPraying(hands)){
                    console.log("gesture unlocked");
                    this.props.enableGestureControlPage(true);
                }
            }else{
                if(hands.length>0) {
                    console.log("hands number: ", hands.length);
                    if(this.props.gamemode){
                        this.detectGameMode(hands);
                    }else{
                        this.detectPosition(hands[0]);
                    }
                    
                    this.timeStamp = parseInt(new Date().getTime()/1000);
                }else{
                    var count = parseInt(new Date().getTime()/1000);
                    count = this.gestureLockCountDown - (count - this.timeStamp);
                    console.log("lock gesture count down:", count);
                    if(count<=0){
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
        if(hands.length>1){
            //compare between every hand
            for(let i = 0; i < hands.length; ++i){
                for(let j = 0; j < hands.length; ++j){
                    //pass the same hand
                    if(i === j) continue;
                    const dotProduct = this.getDot(hands[i].palmNormal, hands[j].palmNormal);
                    //if two palms face to each other
                    if(dotProduct <-0.5){
                        const distance = this.getDistance(hands[i].palmPosition, hands[j].palmPosition);
                        //yes, i know this is a magic number
                        if(distance<50){
                            console.log("good to see you");
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
        return Math.max(Math.abs(velocity[0]),Math.abs(velocity[1]), Math.abs(velocity[2])) > this.cancel_enter_sensitive * 1500;
    }


    detectGameMode(hands){

        if(hands.length===1){
            if(hands[0].palmPosition[1] < this.detectRange && this.isMovingFast(hands[0].palmVelocity)){
                //parameters: exit, xhigh, xlow
                this.props.callback(true);
                return;
            }
        }

        let xlow = hands[0];
        let xhigh = hands[0];
        for(let i = 1; i < hands.length; ++i){
            if(hands[i].palmPosition[0] < xlow.palmPosition[0]){
                xlow = hands[i];
            }
            if(hands[i].palmPosition[0] > xhigh.palmPosition[0]){
                xhigh = hands[i];
            }
        }
        //parameters: exit, xhigh, xlow
        this.props.callback(false, xlow.palmPosition, xhigh.palmPosition);
    }

    detectPosition(hand){
        let cmd = "";
        let detected = false;
        let x = hand.palmPosition[0];
        let y = hand.palmPosition[1];
        let z = hand.palmPosition[2];

        if(y > this.detectRange*2 && this.isMovingFast(hand.palmVelocity)){
            cmd += "enter";
            console.log("success enter");
            detected = true;
        }else if(y < this.detectRange && this.isMovingFast(hand.palmVelocity)){
            cmd += "cancel";
            console.log("success cancel");
            detected = true;
        }else if(x < -this.detectRange){
            cmd += "-x";
            detected = true;
        }else if(x > this.detectRange){
            cmd += "x";
            detected = true;
        }else if(z < -this.detectRange){
            cmd += "-z";
            detected = true;
        }else if(z > this.detectRange){
            cmd += "z";
            detected = true;
        }

        if(detected){
            this.props.callback(cmd);
            this.props.enableGesture(false);
        }
    }

    render(){
        //we should make something visualize here, like gesture lock count down, or gesture is locked or not.
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