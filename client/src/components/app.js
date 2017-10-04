import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Header from './header';
import Home from './home';
import Events from './events';
import Calendar from './calendar';
import About from './about/index.js';
import Gamepad from './gamepad';
import Background from './background';


import GoogleCalendar from './google_calendar';
import LeapMotion from './leapmotion';

//should make a timer outside the google calendar class
class App extends Component {

    render() {
        return (
            <div>
                <Header />
                <GoogleCalendar />
                <LeapMotion />
                <Route exact path="/" component={Home} />
                <Route path="/events" component={Events} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/about" component={About} />
                <Route path="/gamepad" component={Gamepad} />
                {/*<Background />*/}
            </div>
        )
    }
}

export default App;