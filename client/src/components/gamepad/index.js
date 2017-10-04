import React,{Component} from 'react';
import Paddle from './paddle';
import Ball from './ball';
import PongStyleSheet from './pong.css';

class Gamepad extends Component{
    constructor(props){
        super(props);
        this.width = 800;
        this.height = 600;
        this.canvas = null;
        this.ctx = null;
        this.player1 = null;
        this.player2 = null;
        this.ball = null;
        this.interval = null;
        this.side = 20;
        this.speed = 16;
        this.player1_score = null;
        this.player2_score = null;
    }

    componentDidMount(){
        this.initGame();
        this.interval = setInterval(()=>this.update(),30);
        this.serve(1);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    update(){
        this.drawBackground();
        this.player1.update();
        this.player2.update();
        this.ball.update();
        this.checkGameState();
        //this.drawScore(this.ball.getScore());
    }

    checkGameState(){

        let {ball, player1, player2, width, height, side, speed} = this;

        if (0 > ball.y || ball.y+ side > height) {
            var offset = this.ball.velocity.y < 0 ? 0 - ball.y : height - (ball.y+side);
            ball.y += 2*offset;
            ball.velocity.y *= -1;
        }
        let paddle = ball.velocity.x > 0 ? player2: player1;

        var randomNumber = Math.random();
        if (this.collide(paddle.x, paddle.y, paddle.width, paddle.height,
                ball.x, ball.y, side, side)
        ) {
            ball.x = paddle===player1 ? player1.x + player1.width : player2.x - side;
            let n = (ball.y+ side - paddle.y)/(paddle.height+ side);
            let radians = 45 * Math.PI/180 * (2*n - 1 );
            ball.velocity.x = (paddle===player1? 1 : -1)*speed*Math.cos(radians);
            ball.velocity.y =speed*Math.sin(radians);
        }
        if (0 > ball.x+side) {
            this.serve(1);
            this.player2_score += 1;
        }
        if (ball.x > width) {
            this.serve(-1);
            this.player1_score += 1;
        }

    }

    collide(paddleXval, paddleYval, paddleWidthVal, paddleHeightVal, ballX, ballY, ballWidth, ballHeight) {
        if (paddleXval < ballX + ballWidth 
            && paddleYval < ballY + ballHeight 
            && ballX < paddleXval + paddleWidthVal 
            && ballY < paddleYval + paddleHeightVal){
            return true;
        }
    }

    serve(side){
        var randomNumber = Math.random();
        this.ball.x = side===1 ? this.player1.x+this.player1.width : this.player2.x - this.side;
        this.y = (this.height - this.side)*randomNumber;
        var radians = 0.1*Math.PI*(1 - 2*randomNumber);
        this.ball.velocity = {
            x: side*this.speed*Math.cos(radians),
            y: this.speed*Math.sin(radians)
        }
    }

    drawScore(scores){

    }

    drawBackground(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "#5cb7d6";
        this.ctx.font = "30px Arial";
        this.ctx.fillRect((this.width - 4) / 2, 0, 4,this.height );
    }

    initGame(){
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext("2d");

        this.player1_score = 0;
        this.player2_score = 0;

        let playerOption = {
            x: 20,
            y: 300,
            width: 20,
            height: 100,
            ctx: this.ctx
        };
        this.player1 = new Paddle(playerOption);
        playerOption.x = 760;
        this.player2 = new Paddle(playerOption);
        let ballOption = {
            x: 400,
            y: 300,
            side: this.side,
            ctx: this.ctx,
        }
        this.ball = new Ball(ballOption);
    }

    render(){
        return (
            <div>
                <canvas ref="canvas" width={this.width} height={this.height} />
            </div>
        );
    }
}

export default Gamepad;