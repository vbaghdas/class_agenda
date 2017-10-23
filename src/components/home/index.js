import React,{Component} from 'react';
import CarouselCSS from './carousel.css';
import {Carousel} from 'react-materialize';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {enableGesture, setGestureCallback} from '../../actions';

class Home extends Component{

    constructor(props){
        super(props);
        this.canPress = true;
        this.onGesture = this.onGesture.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.state = {
            location: 0
        }
    }

    componentWillMount(){
        this.props.setGestureCallback(this.onGesture);
        document.onkeydown = this.handleKeypress;
    }

    onGesture(cmd){
        if(cmd === "enter"){
            let path = document.querySelector(".carousel-item.active a").getAttribute("href");
            this.props.history.push(path);
        }else if(cmd === "-x"){
            this.pressRightArrow();
        }else if(cmd === "x"){
            this.pressLeftArrow();
        }
        setTimeout(()=> {this.props.enableGesture(true);}, 1000);
    }

    pressLeftArrow(){
        var e = new Event("keydown");
        e.which = 39;
        document.dispatchEvent(e);
    }

    pressRightArrow(){
        var e = new Event("keydown");
        e.which = 37;
        document.dispatchEvent(e);
    }

    handleKeypress(e){
        const { location } = this.state;
        const carousel = $('.carousel');
        
        switch(e.which) {
            case 37: // left
                if(this.canPress && location < 3){
                    this.canPress = false;
                    carousel.carousel('next');
                    this.setState( prevState => {
                        this.canPress = true;
                        return {location: prevState.location + 1};
                    });
                }
                break;

            case 39: // right
                if(this.canPress && location > 0){
                    this.canPress = false;
                    carousel.carousel('prev');
                    this.setState( prevState => {
                        this.canPress = true;
                        return {location: prevState.location - 1}
                    });
                }
                break;
            default: return;
        }
        e.preventDefault();
    }

    setLocation(index){
        this.setState({location: index});
    }

    render(){
        return (
            <Carousel options={{ indicators: true, noWrap: true }}>
                <div className="carousel-item" onClick={() => this.setLocation(0)}>
                    <Link to="/events"><i className="fa fa-list-ul"></i></Link>
                </div>
                <div className="carousel-item" onClick={() => this.setLocation(1)}>
                    <Link to="/calendar"><i className="fa fa-calendar"></i></Link>
                </div>
                <div className="carousel-item" onClick={() => this.setLocation(2)}>
                    <Link to="/gamepad"><i className="fa fa-gamepad"></i></Link>
                </div>
                <div className="carousel-item" onClick={() => this.setLocation(3)}>
                    <Link to="/about"><i className="fa fa-users"></i></Link>
                </div>
            </Carousel>
        );
    }
}

const mapStateToProps = state => {
    var {leap} = state;
    return {
        leap: leap
    };
};

export default connect(mapStateToProps, {enableGesture, setGestureCallback})(Home);