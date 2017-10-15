import React,{Component} from 'react';
import CarouselCSS from './carousel.css';
import {Carousel} from 'react-materialize';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {enableGesture, setGestureCallback} from '../../actions';

class Home extends Component{

    constructor(props){
        super(props);
        this.onGesture = this.onGesture.bind(this);
    }

    componentWillMount(){
        this.props.setGestureCallback(this.onGesture);
    }

    onGesture(cmd){
        if(cmd === "enter"){
            let path = document.querySelector(".selected a").getAttribute("href");
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

    render(){
        return (
            <Carousel options={{ indicators: true, noWrap: true }}>
                <div className="carousel-item">
                    <Link to="/events"><i className="fa fa-list-ul"></i></Link>
                </div>
                <div className="carousel-item">
                    <Link to="/calendar"><i className="fa fa-calendar"></i></Link>
                </div>
                <div className="carousel-item">
                    <Link to="/gamepad"><i className="fa fa-gamepad"></i></Link>
                </div>
                <div className="carousel-item">
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
