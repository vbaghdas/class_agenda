import React, { Component } from 'react';
import ModalCSS from './modal.css';
import EventCSS from '../events/event.css';

class Modal extends Component {
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        const { eventAvatar, eventCard } = {
            float: 'none'
        };

        return (
            <div className="modalShadow" onClick={this.props.onClose}>
                <div className="modalBody">
                    <div className="container">
                        <div className="row">
                            <div className="event">
                                <div className="eventAvatar col-xs-12" style={eventAvatar}>
                                    <img className="avatar" src={this.props.event.avatar}/>
                                </div>
                                <div className="eventCard col-xs-12" style={eventCard}>
                                    <div className="eventCardTop">
                                        <span className="company"><img className="companyLogo" src={this.props.event.logo}/>
                                        </span>
                                    </div>
                                    <div className="eventCardMiddle">
                                        <span className="eventDate">{this.props.event.date}</span>
                                        <span className="eventSpeaker">{this.props.event.name}</span>
                                    </div>
                                    <div className="eventCardFooter">
                                        <span className="eventFacility">{this.props.event.facility}</span>
                                        <span className="eventLocation">{this.props.event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
}

export default Modal;