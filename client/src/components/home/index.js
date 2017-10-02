import React, {Component}from 'react';
import SliderCSS from './slider.css';
import SliderJS from './slider';

import { Link } from 'react-router-dom';

class Home extends Component{
    //not finished
    iconVals = [
        {
            link: "/about",
            class: "fa fa-users"
        },
        {
            link: "/events",
            class: "fa fa-list-ul"
        },
        {
            link: "/calendar",
            class: "fa fa-calendar"
        }
    ];

    //not finished
    createIcon(vals){
        return(
            <div className="navIcon">
                <Link to={vals.link}><i className={vals.class} aria-hidden="true"></i></Link>
            </div>
        );
    }

    render(){
        return(
            <div className="navIconContainer">
                <div id="carousel">
                    <div className="prev navBut">
                        <div className="navIcon">
                            <Link to="/about"><i className="fa fa-users" aria-hidden="true"></i></Link>
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
                </div>
            </div>
        );
    }
}

export default Home;