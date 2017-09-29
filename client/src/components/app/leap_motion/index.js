//when recognise a gesture, stop recognizing, and call callback,
//and then finish what u when do then start it again

/* what you will need
<script src="http://js.leapmotion.com/leap-0.6.3.js"></script>
// not this one <script src="http://js.leapmotion.com/leap-plugins-0.1.8.js"></script>
<script src="leap.js"></script>
*/

/*********** example usage *****************/
// document.addEventListener("DOMContentLoaded", init);
// var leap = null;
// function init(){
//     leap = new LeapMotion(onGesture);
// }

// function onGesture(gesture){
//     console.log(gesture);

//     setTimeout(()=>{gesture.leap.startRecognise()},1000);
// }

class LeapMotion{
    constructor(dispatcher){
        this.dispatcher = dispatcher;
        this.dispatcher.addListener("stopRecogniseGesture", this.stopRecognise);
        this.dispatcher.addListener("startRecogniseGesture", this.startRecognise);
        
        this.options = {
            frameEventName: "deviceFrame"
        };
        this.stop = false;
        this.sensitive = 0.8;
        this.accuracy = 0.6;
        this.timeCapture = 40; // frame
        this.distanceCapture = 200;
        this.controller = Leap.loop(this.options, (frame)=> {
            if(stop){return;}
            var hands = frame.hands;
            if(hands.length>0)
            {
                var pframes = this.getPreviousFrame( 1, Math.ceil(this.sensitive*this.timeCapture));
                for(var i = 0; i < hands.length; ++i){
                    this.analysisGesture(hands[i],pframes);
                }
            }
        });
    }

    
    stopRecognise(){
        stop = true;
    }
    startRecognise(){
        stop = false;
    }


    getPreviousFrame(start, end){
        if(arguments.length === 1 || start === end){
            return this.controller.frame(start);
        }else{
            var resultArray = [];
            var length = Math.abs(start-end);
            var min = start < end ? start:end;
            var step = Math.ceil((length * this.accuracy)/length);
            for(var i = min; i < length; i += step){
                resultArray.push(this.controller.frame(i));
            }
            return resultArray;
        }
    }


    analysisGesture(hand, previousFrames){
        var movement = {
            arr: [],
            total: { x: 0, y: 0, z:0 },
            avg: { x: 0, y: 0, z:0 }
        }
        var movement_x_arr = [];
        var movement_y_arr = [];
        var movement_z_arr = [];
        for(var i = 0; i < previousFrames.length; ++i){
            var m = hand.translation(previousFrames[i]);
            movement.arr.push({
                x: m[0],
                y: m[1],
                z: m[2]
            });
        }
        for(var i = 0; i < previousFrames.length; ++i){
            movement.total.x += movement.arr[i].x;
            movement.total.y += movement.arr[i].y;
            movement.total.z += movement.arr[i].z;
        }
        movement.avg.x = movement.total.x / previousFrames.length;
        movement.avg.y = movement.total.y / previousFrames.length;
        movement.avg.z = movement.total.z / previousFrames.length;

        let farest = Math.max(Math.abs(movement.avg.x),Math.abs(movement.avg.y),Math.abs(movement.avg.z));
        if( farest > this.sensitive*this.distanceCapture){
            let cmd = "swipe_";
            switch(farest){
                case Math.abs(movement.avg.x):
                    cmd += movement.avg.x >0 ? "x" : "-x";
                    break;
                case Math.abs(movement.avg.y):
                cmd += movement.avg.y >0 ? "y" : "-y";
                    break;
                case Math.abs(movement.avg.z):
                cmd += movement.avg.z >0 ? "z" : "-z";
                    break;
            }
            console.log(cmd);
            this.dispatcher.dispatch("stopRecogniseGesture");
            this.dispatcher.dispatch(cmd);
        }
    }
}

export default LeapMotion;
