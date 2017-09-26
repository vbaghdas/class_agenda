import React from 'react';

export default (props) => {
    return (
        <div className="eventContainer container">
            <div className="row eventRow">
                <div className="eventCard">
                    <div className="avatarContainer col-xs-12 col-md-3 col-lg-3">
                        <img className="avatar" src={props.event.avatar}/>
                    </div>
                    <div className="eventCardBody col-xs-12 col-md-9 col-lg-9">
                        <div className="eventCardBodyTop">
                            <span className="company">
                                <img className="companyLogo" src={props.event.logo}/>
                            </span>
                        </div>
                        <div className="eventCardBodyMiddle">
                            <span className="eventDate">{props.event.date}</span>
                            <span className="eventSpeaker">{props.event.name}</span>
                        </div>
                        <div className="eventCardBodyBottom">
                            <span className="eventFacility">{props.event.facility}</span>
                            <span className="eventLocation">{props.event.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}