import React from 'react';

import { Route } from 'react-router-dom';

import Header from './header';
import Home from './home/home';
import Events from './events/events';
import Calendar from './calendar';
import About from './about';
import GoogleCalendar from './google_calendar';

const App = () => (
    <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/events" component={Events} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/about" component={About} />
    </div>
);

export default App;