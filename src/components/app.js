import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import GoogleCalendar from './google_calendar';
import LeapMotion from './leapmotion';
import Background from './background';
import Header from './header';

import Home from './home';
import Events from './events';
import Calendar from './calendar';
import About from './about';
import Gamepad from './gamepad';

class App extends Component {
    render() {
        return (
            <div>
                <GoogleCalendar />
                <LeapMotion />
                <Background />
                <Header />
                <Route exact path="/" component={Home} />
                <Route path="/events" component={Events} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/about" component={About} />
                <Route path="/gamepad" component={Gamepad} />
            </div>
        )
    }
}

export default App;