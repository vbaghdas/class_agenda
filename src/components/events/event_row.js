import React from 'react';
import EventCSS from './event.css';

export default (props) => {
    const backgroundImage = {
        background: `url(${props.event.avatar})`
    }
    
    return (
        <div className="col s12 m7">
            <div className="card horizontal hoverable">
                <div style={backgroundImage} className="background-image"></div>
                <div className="card-image hide-on-small-only">
                    <img src={props.event.avatar}/>
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <img className="company-logo" src={props.event.logo} />
                        <p className="event-date">{props.event.date}</p>
                        <p className="event-name">{props.event.name}</p>
                    </div>
                    <div className="card-action">
                        <span className="event-facility">{props.event.facility}</span>
                        <span className="event-location right">{props.event.location}</span>
                    </div>
                </div>
            </div>
        </div>
    )        
}