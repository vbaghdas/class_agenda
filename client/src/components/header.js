import React from 'react';
import {
    Link
} from 'react-router-dom';
import logo from '../assets/images/lfz_logo.png';

export default () => (
    <div className="pos-f-t">
        <div className="collapse show" id="navbarToggleExternalContent">
            <div className="p-4">
                <Link to="/" className="navbar-brand"><img src={logo}/></Link>
                <h2 className="text-white text-center">Welcome to the Learning Fuze Portal</h2>
                <h4 className="text-muted text-center">Wave to get started... </h4>
            </div>
        </div>
        <nav className="navbar navbar-inverse navHomePage">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </nav>
    </div>
)