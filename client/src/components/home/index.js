import React from 'react';
import SliderCSS from './slider.css';
import SliderJS from './slider';

import { Link } from 'react-router-dom';

export default () => (
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
)