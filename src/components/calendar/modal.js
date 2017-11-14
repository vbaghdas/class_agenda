import React, { Component } from 'react';
import ModalCSS from './modal.css';

class Modal extends Component {
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        const { eventAvatar, eventCard } = {
            float: 'none'
        };

        const { avatar, logo, date, name, facility, location } = this.props.event;

        return (
            <div className="modal-shadow" onClick={this.props.onClose}>
                <div className="modal-body">
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-image">
                                    <img src={avatar} />
                                </div>
                                <div className="card-content">
                                    <img className="company-logo" src={logo} />
                                    <span className="card-title">{date}</span>
                                    <p className="event-name">{name}</p>
                                </div>
                                <div className="card-action">
                                    <span className="event-facility">{facility}</span>
                                    <span className="event-location right">{location}</span>
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