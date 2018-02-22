import React from 'react';
import { Link } from 'react-router-dom';
import GamePadCSS from './gamepad.css';

export default () => {
    return (
        <div className="container start-game-container">
            <div className="start-game-wrap">
                <Link to="/gamepad">
                    <h1 className="fadeIn">START GAME</h1>
                </Link>
            </div>
        </div>
    )        
}