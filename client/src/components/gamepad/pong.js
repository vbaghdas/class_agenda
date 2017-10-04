

//encapsulate all the code within canvasApp
function canvasApp() {

    //variable declarations
    var requestAnimationId = null;
    var startButton = document.getElementById('start');
    var resetButton = document.getElementById('reset');
    var notRunning = true;
    var WIDTH = 1920; //canvas width used as a constant
    var HEIGHT = 1080;//canvas height used as a constant
    var pi = Math.PI; //constant pi
    var canvas;
    var canvasContext;
    var playerPaddle;
    var player2;
    var ball;
    var newLpLeftHandY = 250;
    var newLpRightHandY = 250;

//create canvas element and appendChild to body
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvasContext = canvas.getContext("2d");

    document.querySelector(".gameArea").append(canvas);


//initialize playerPaddle object
    playerPaddle = {
        x: null,
        y: null,
        width: 20,
        height: 100,
        update: function() {
            this.y = newLpLeftHandY;

//need to control the paddle from going out of the playing area
            this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);

        },
        draw: function() {
            canvasContext.fillRect(this.x, this.y, this.width, this.height);
        }
    };

    player2 = {
        x: null,
        y: null,
        width: 20,
        height: 100,
        update: function() {
            this.y = newLpRightHandY;

//need to control the paddle from going out of the playing area
            this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);

        },
        draw: function() {
            canvasContext.fillRect(this.x, this.y, this.width, this.height);
        }
    };


    var previousFrame = null;
    Leap.loop(function(frame) {

        if (frame.hands.length > 0) {
            for (var i = 0; i < frame.hands.length; i++) {

                var hand = frame.hands[i];
                if(hand.palmPosition[1] < 50 ){
                    cancelAnimationFrame(requestAnimationId);
                    location.reload();
                };
               // console.log(hand.type);
                if(hand.type === 'left') {
                    var lpLeftHandY = hand.palmPosition[2];
                    newLpLeftHandY = (100 - lpLeftHandY) * 4 ;
                }
                if(hand.type === 'right') {
                    var lpRightHandY = hand.palmPosition[2];
                    newLpRightHandY = (100 - lpRightHandY) * 4 ;
                }

            }//for loop

        }//if frame.hands

    });//leap loop func

//initialize ball object and keep score
    ball = {
        x: null,
        y: null,
        playerScore: 0,
        playerScoreXposition: 450,
        aiScore: 0,
        aiScroceXposition: 1452,
        scoreYposition: 50,
        velocity: {},
        side: 20,
        speed: 16,
//the ball needs to be served to start the game
        serve: function(side) {
            var randomNumber = Math.random();
            this.x = side===1 ? playerPaddle.x+playerPaddle.width : player2.x - this.side;
            this.y = (HEIGHT - this.side)*randomNumber;
            var radians = 0.1*pi*(1 - 2*randomNumber);
            this.velocity = {
                x: side*this.speed*Math.cos(radians),
                y: this.speed*Math.sin(radians)
            }
        },
//need to change the balls position
        update: function() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
//keep the ball within the play areas Height
            if (0 > this.y || this.y+this.side > HEIGHT) {
                var offset = this.velocity.y < 0 ? 0 - this.y : HEIGHT - (this.y+this.side);
                this.y += 2*offset;
                this.velocity.y *= -1;
            }
//collision when rectangles intersect axis aligned bounding boxes
            var collide = function(paddleXval, paddleYval, paddleWidthVal, paddleHeightVal, ballX, ballY, ballWidth, ballHeight) {
                if (paddleXval < ballX + ballWidth && paddleYval < ballY + ballHeight && ballX < paddleXval + paddleWidthVal && ballY < paddleYval + paddleHeightVal){
                    return true;
                }
            };
//depending on the direction of the ball we toggle paddle from ai to player  for the collide test
            var paddle = this.velocity.x > 0 ?  player2:playerPaddle ;
            var randomNumber = Math.random();
            if (collide(paddle.x, paddle.y, paddle.width, paddle.height,
                    this.x, this.y, this.side, this.side)
            ) {
                this.x = paddle===playerPaddle ? playerPaddle.x+playerPaddle.width : player2.x - this.side;
//normalize value of where the paddle hits : take the y position of the ball + the side of 20 -
                var n = (this.y+this.side - paddle.y)/(paddle.height+this.side);
// radians = angle * Math.PI/ 180 : (2*n - 1) value between -1 and +1
                var radians = 45 * pi/180 * (2*n - 1 );

                this.velocity.x = (paddle===playerPaddle ? 1 : -1)*this.speed*Math.cos(radians);
                this.velocity.y = this.speed*Math.sin(radians);
            }
//check for ball out of bounds and if so increment score and serve
            if (0 > this.x+this.side) {
                this.serve(1);
                this.aiScore += 1;
            }
            if (this.x > WIDTH) {
                this.serve(-1);
                this.playerScore += 1;
            }
        },
//draw the ball in new position to simulate motion and display the score
        draw: function() {
            canvasContext.fillRect(this.x, this.y, this.side, this.side);
            canvasContext.fillText(this.playerScore,this.playerScoreXposition,this.scoreYposition);
            canvasContext.fillText(this.aiScore,this.aiScroceXposition,this.scoreYposition);
        }
    };
//initialize the players, player2 vs playerPaddle
    playerPaddle.x = playerPaddle.width;
    playerPaddle.y = (HEIGHT - playerPaddle.height)/2;

    player2.x = WIDTH - (playerPaddle.width + player2.width);
    player2.y = (HEIGHT - player2.height)/2;

    ball.serve(1);

    function draw() {
//draw the play area and give it a color of black
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
//prepare font color, font style, and size
        canvasContext.fillStyle = "#5cb7d6";
        canvasContext.font = "30px Arial";
        ball.draw();
        playerPaddle.draw();
        player2.draw();
//draw the net
        canvasContext.fillRect((WIDTH - 4) / 2, 0, 4,HEIGHT );
//check for the playerPaddle win condition
        if (ball.playerScore > 10) {
            canvasContext.fillStyle = "#000";
            canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
            canvasContext.fillStyle = "#5cb7d6";
            canvasContext.fillText("Left Side Wins",(WIDTH/2)-50,HEIGHT/4);
            notRunning = true;
        }
//check for the playerPaddle lose condition
        if (ball.aiScore > 10) {
            canvasContext.fillStyle = "#000";
            canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
            canvasContext.fillStyle = "#5cb7d6";
            canvasContext.fillText("Right Side Wins", (WIDTH / 2) - 50, HEIGHT / 4);
            notRunning = true;
        }
    }
//animation defined- update before drawing
    var loop = function() {
        playerPaddle.update();
        player2.update();
        ball.update();
        draw();
//continue the animation loop

        window.requestAnimationFrame(loop);
    };
//start the animation loop

    requestAnimationId = requestAnimationFrame(loop);
}