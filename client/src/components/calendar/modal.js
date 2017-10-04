import React, { Component } from 'react';

class Modal extends Component {
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        const { avatarContainer, eventContainer } = {
            float: 'none'
        };

        return (
            <div className="backdrop" onClick={this.props.onClose}>
                <div className="modalBody fadeIn">
                    <div className="eventContainer container">
                        <div className="row eventRow">
                            <div className="eventCard">
                                <div className="avatarContainer col-xs-12" style={avatarContainer}>
                                    <img className="avatar" src={this.props.event.avatar}/>
                                </div>
                                <div className="eventCardBody col-xs-12" style={eventContainer}>
                                    <div className="eventCardBodyTop">
                                        <span className="company"><img className="companyLogo" src={this.props.event.logo}/>
                                        </span>
                                    </div>
                                    <div className="eventCardBodyMiddle">
                                        <span className="eventDate">{this.props.event.date}</span>
                                        <span className="eventSpeaker">{this.props.event.name}</span>
                                    </div>
                                    <div className="eventCardBodyFooter">
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