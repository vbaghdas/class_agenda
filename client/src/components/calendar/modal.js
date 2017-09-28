import React from 'react';

class Modal extends React.Component {
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        const avatarContainer = {
            float: 'none'
        };

        const eventContainer = {
            float: 'none'
        };

        return (
            <div className="backdrop" onClick={this.props.onClose}>
                <div className="modalBody fadeIn">
                    <div className="eventContainer container">
                        <div className="row eventRow">
                            <div className="eventCard">
                                <div className="avatarContainer col-xs-12" style={avatarContainer}>
                                </div>
                                <div className="eventCardBody col-xs-12" style={eventContainer}>
                                    <div className="eventCardBodyTop">
                                        <span className="company"></span>
                                    </div>
                                    <div className="eventCardBodyMiddle">
                                        <span className="eventDate"></span>
                                        <span className="eventSpeaker"></span>
                                    </div>
                                    <div class="eventCardBodyFooter">
                                        <span className="eventFacility"></span>
                                        <span className="eventLocation"></span>
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