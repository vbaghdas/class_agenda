import React,{Component} from 'react';
import SliderCSS from './slider.css';
import SliderJS from './slider';

import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {enableGesture} from '../../actions';


class Home extends Component{

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

        if(this.props.gesture_enable && this.props.gesture_cmd === "swipe_-x"){
            this.pressLeftArrow();
            setTimeout(()=> {this.props.enableGesture(true);}, 1000);
        }else if(this.props.gesture_enable && this.props.gesture_cmd === "swipe_x"){
            this.pressRightArrow();
            setTimeout(()=> {this.props.enableGesture(true);}, 1000);
        }

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
                    <div className="nextRightSecond navBut">
                        <div className="navIcon">
                            <Link to="/facebook"><i className="fa fa-facebook-square" aria-hidden="true"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        gesture_cmd : state.gesture.cmd,
        gesture_enable: state.gesture.enable
    };
};

export default connect(mapStateToProps, {enableGesture})(Home);
