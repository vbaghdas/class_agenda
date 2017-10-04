class Paddle {
    constructor(props){
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height= props.height;
        this.ctx = props.ctx;
    }

    update(cmd){
        this.draw();
    }

    draw(){
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

export default Paddle;