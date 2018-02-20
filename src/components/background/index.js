import React, { Component } from 'react';
import BackgroundCSS from './background.css';

class Background extends Component{
    render(){
        return (
            <div id="animation-wrap">
                <div id="animation-canvas">
                    <video id="background-video" loop autoPlay muted>
                    <source src='/video/video.mp4' type="video/mp4" />
                    <source src='/video/video.mp4' type="video/ogg" />
                    Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        );
    }
}

export default Background;