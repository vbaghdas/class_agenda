

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

function LeapMotion(gestureCallback){
    var options = {};
    var controller = null;
    var stop = false;
    var self = this;
    this.gestureCallback = null;
    //min=0 max=1
    this.sensitive = 0.5;
    //min=0 max=1
    this.accuracy = 0.8;
    this.timeCapture = 60;//frame
    this.distanceCapture = 200;
    
    this.stopRecognise = function (){
        stop = true;
    }
    this.startRecognise = function(){
        stop = false;
    }


    this.getPreviousFrame = function(start, end){
        if(arguments.length === 1 || start === end){
            return controller.frame(start);
        }else{
            var resultArray = [];
            var length = Math.abs(start-end);
            var min = start < end ? start:end;
            var step = Math.ceil((length * self.accuracy)/length);
            for(var i = min; i < length; i += step){
                resultArray.push(controller.frame(i));
            }
            return resultArray;
        }
    }

    function init(){
        self.gestureCallback = gestureCallback;
        controller = Leap.loop(options, function(frame) {
            if(stop){return;}
            var hands = frame.hands;
            if(hands.length>0)
            {
                var pframes = self.getPreviousFrame( 1, Math.ceil(self.sensitive*self.timeCapture));
                for(var i = 0; i < hands.length; ++i){
                    analysisGesture(hands[i],pframes);
                }
            }
        });
    }

    function analysisGesture(hand, previousFrames){
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
        if(movement.avg.x < self.sensitive*-self.distanceCapture){
            console.log("swipe left");
            //make an gesture object then stop recognizing
            triggerGesture({type: "swipe", data: "-x"});
        }else if(movement.avg.x > self.sensitive* self.distanceCapture){
            console.log("swipe right");
            triggerGesture({type: "swipe", data: "x"});
        }else if(movement.avg.y < self.sensitive* -self.distanceCapture){
            console.log("swipe down");
            triggerGesture({type: "swipe", data: "-y"});
        }else if(movement.avg.y > self.sensitive* self.distanceCapture){
            console.log("swipe up");
            triggerGesture({type: "swipe", data: "y"});
        }else if(movement.avg.z < self.sensitive* -self.distanceCapture){
            console.log("swipe forward");
            triggerGesture({type: "swipe", data: "-z"});
        }else if(movement.avg.z > self.sensitive* self.distanceCapture){
            console.log("swipe back");
            triggerGesture({type: "swipe", data: "z"});
        }
    }

    function triggerGesture(gesture){
        self.stopRecognise();
        self.gestureCallback({leap:self, type: gesture.type, data: gesture.data});
    }

   
    init();
}

