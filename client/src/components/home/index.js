import React,{Component} from 'react';
import SliderCSS from './slider.css';
import SliderJS from './slider';

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
            <div className="navIconContainer">
                <div id="carousel">
                    <div className="prevLeftSecond navBut">
                        <div className="navIcon">
                            <Link to="/about"><i className="fa fa-users" aria-hidden="true"></i></Link>
                        </div>
                    </div>
                    <div className="prev navBut">
                        <div className="navIcon">
                            <Link to="/gamepad"><i className="fa fa-gamepad" aria-hidden="true"></i></Link>
                        </div>
                    </div>
                    <div className="selected navBut">
                        <div className="navIcon">
                            <Link to="/events"><i className="fa fa-list-ul" aria-hidden="true"></i></Link>
                        </div>
                    </div>
                    <div className="next navBut">
                        <div className="navIcon">
                            <Link to="/calendar"><i className="fa fa-calendar" aria-hidden="true"></i></Link>
                        </div>
                    </div>
                    {/* <div className="nextRightSecond navBut">
                        <div className="navIcon">
                            <Link to="/facebook"><i className="fa fa-facebook-square" aria-hidden="true"></i></Link>
                        </div>
                    </div> */}
                </div>
            </div>
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
