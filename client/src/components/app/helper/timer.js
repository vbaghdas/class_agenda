class Timer{

    constructor(callback, sec){
        this.callback = callback;
        this.sec = sec;
        this.interval_id = null;
    }

    start(){
        this.interval_id = setInterval(this.callback, this.sec*1000);
    }

    stop(){
        clearInterval(this.interval_id);
    }
}

export default Timer;