import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Header from './header';
import Home from './home/home';
import Events from './events/events';
import Calendar from './calendar';
import About from './about';
import Background from './background/background';

import GoogleCalendar from './google_calendar';
import option from './google_calendar_config';
import Timer from './timer';

//should make a timer outside the google calendar class
class App extends Component {

    constructor(props){
        super(props);
        this.onEventLoaded = this.onEventLoaded.bind(this);
        this.googleCalendar = new GoogleCalendar(option, this.onEventLoaded);
        this.Timer = new Timer(this.googleCalendar.load, option.refreshTime);
        

        this.state = {
            events: []
        }
        
    }

    componentDidMount () {
        this.googleCalendar.load();
        this.Timer.start();
    }

    onEventLoaded(events){
        this.setState({events});
        console.log("this is the state",this.state);
    }

    render() {
        return (
            <div>
                <Header />
                <Route exact path="/" component={Home} />
                <Route path="/events" render={ routeData => {
                    return <Events {...routeData} name={name} />
                }} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/about" component={About} />
                <Background />
            </div>
        )
    }
}

export default App;