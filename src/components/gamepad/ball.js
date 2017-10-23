class Ball {
    constructor(props){
        this.x = props.x;
        this.y = props.y;
        this.player1_score = 0;
        this.player2_score = 0;
        this.velocity = {};
        this.side = props.side;
        this.ctx = props.ctx;
    }

    getScore(){

    }

    

    update(){
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }

    draw(){
        this.ctx.fillRect(this.x, this.y, this.side, this.side);
    }
}

export default Ball;