import React from 'react';
import {
    NavLink, Link 
} from 'react-router-dom';
import NavWrapperCSS from '../components/home/carousel.css';
import logo from '../assets/images/lfz_logo.png';

export default () => (
<nav>
    <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
            <img className="nav-logo" src={logo}/>
        </Link>
        <ul className="right hide-on-med-and-down">
            <li><NavLink exact to="/"><i className="fa fa-home fa-2x"></i></NavLink></li>
            <li><NavLink to="/events"><i className="fa fa-list-ul fa-2x"></i></NavLink></li>
            <li><NavLink to="/calendar"><i className="fa fa-calendar fa-2x"></i></NavLink></li>
            <li><NavLink to="/start_game"><i className="fa fa-gamepad fa-2x"></i></NavLink></li>
            <li><NavLink to="/about"><i className="fa fa-users fa-2x"></i></NavLink></li>
        </ul>
    </div>
</nav>
)