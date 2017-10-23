import React from 'react';

export default (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="event">
                    <div className="eventAvatar col-xs-12 col-md-3 col-lg-3">
                        <img className="avatar" src={props.event.avatar}/>
                    </div>
                    <div className="eventCard col-xs-12 col-md-9 col-lg-9">
                        <div className="eventCardTop">
                            <span className="company">
                                <img className="companyLogo" src={props.event.logo}/>
                            </span>
                        </div>
                        <div className="eventCardMiddle">
                            <span className="eventDate">{props.event.date}</span>
                            <span className="eventSpeaker">{props.event.name}</span>
                        </div>
                        <div className="eventCardBottom">
                            <span className="eventFacility">{props.event.facility}</span>
                            <span className="eventLocation">{props.event.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}