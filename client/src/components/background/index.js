import React,{Component} from 'react';

class Background extends Component{

    componentDidMount(){
        run();
    }

    render(){
        return (
            <div id="animation-wrap">
                <canvas id="animation-canvas"></canvas>
            </div>
        );
    }
}

export default Background;

function run() {
    
        var bg_animated = false;
        var bg_number_of_curves = 6;
    
        var canvas = document.getElementById("animation-canvas");
        var ctx = canvas.getContext("2d");
        window.requestAnimFrame = function (callback) {
            window.setTimeout(callback, 1000/10);
        };
    
        var curves_array = [];
        var curve = function (abc1x, abc1y, abc2x, abc2y, x, y, abc1xvx, abc1xvy, abc1yvx, abc1yvy, abc2xvx, abc2xvy, abc2yvx, abc2yvy) {
            this.abc1x = abc1x;
            this.abc1y = abc1y;
            this.abc2x = abc2x;
            this.abc2y = abc2y;
            this.x = x;
            this.y = y;
    
            this.abc1xvx = abc1xvx;
            this.abc1xvy = abc1xvy;
            this.abc1yvx = abc1yvx;
            this.abc1yvy = abc1yvy;
    
            this.abc2xvx = abc2xvx;
            this.abc2xvy = abc2xvy;
            this.abc2yvx = abc2yvx;
            this.abc2yvy = abc2yvy;
        };
    
        function bgCanvasResize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    
        function bgCanvasInit() {
            for (var i = 0; i < bg_number_of_curves; i++) {
                var abc1x = Math.random() * canvas.width;
                var abc1y = Math.random() * canvas.height;
                var abc2x = Math.random() * canvas.width;
                var abc2y = Math.random() * canvas.height;
                var x = 0;
                var y = 0;
    
                var abc1xvx = (Math.random() * 2 - 1) * 5 ;
                var abc1xvy = (Math.random() * 2 - 1) * 5 ;
    
                var abc1yvx = (Math.random() * 2 - 1) * 5 ;
                var abc1yvy = (Math.random() * 2 - 1) * 5 ;
    
                var abc2xvx = (Math.random() * 2 - 1) * 5 ;
                var abc2xvy = (Math.random() * 2 - 1) * 5 ;
    
                var abc2yvx = (Math.random() * 2 - 1) * 5 ;
                var abc2yvy = (Math.random() * 2 - 1) * 5 ;
    
                curves_array.push(
                    new curve(
                        abc1x, abc1y, abc2x, abc2y,
                        x, y,
                        abc1xvx, abc1xvy, abc1yvx, abc1yvy,
                        abc2xvx, abc2xvy, abc2yvx, abc2yvy
                    )
                );
            }
        }
    
        function bgCanvasDraw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            ctx.lineWidth = 20;
            ctx.strokeStyle = "#5cb7d6";
    
            for (var i = 0; i < curves_array.length; i++) {
    
                ctx.beginPath();
                ctx.moveTo(-100, canvas.height + 100);
                ctx.bezierCurveTo(
                    curves_array[i].abc1x, curves_array[i].abc1y,
                    curves_array[i].abc2x, curves_array[i].abc2y,
                    canvas.width + 100, curves_array[i].y - 100
                );
                ctx.stroke();
    
                if (curves_array[i].abc1x < 0 || curves_array[i].abc1x > canvas.width) {
                    curves_array[i].abc1x -= curves_array[i].abc1xvx*1;
                    curves_array[i].abc1xvx *= -1;
                }
                if (curves_array[i].abc1y < 0 || curves_array[i].abc1y > canvas.height) {
                    curves_array[i].abc1y -= curves_array[i].abc1yvy*1;
                    curves_array[i].abc1yvy *= -1;
                }
    
                if (curves_array[i].abc2x < 0 || curves_array[i].abc2x > canvas.width) {
                    curves_array[i].abc2x -= curves_array[i].abc2xvx*1;
                    curves_array[i].abc2xvx *= -1;
                }
                if (curves_array[i].abc2y < 0 || curves_array[i].abc2y > canvas.height) {
                    curves_array[i].abc2y -= curves_array[i].abc2yvy*1;
                    curves_array[i].abc2yvy *= -1;
                }
                curves_array[i].abc1y += curves_array[i].abc1yvy;
                curves_array[i].abc1x += curves_array[i].abc1xvx;
                curves_array[i].abc2x += curves_array[i].abc2xvx;
            }
            requestAnimFrame(bgCanvasDraw);
        }
    
        function bgCanvas() {
            bgCanvasResize();
            bgCanvasInit();
            bgCanvasDraw();
        }
    
        bgCanvas();
    }