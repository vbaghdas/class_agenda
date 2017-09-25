import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Header from './header';
import Home from './home/home';
import Events from './events/events';
import Calendar from './calendar';
import About from './about';
import Background from './background/background';

import GoogleCalendar from './google_calendar';

class App extends Component {

    constructor(props){
        super(props);
        this.onEventLoaded = this.onEventLoaded.bind(this);

        var option = {
            calendar_id: 'final.project.lfz@gmail.com',
            api_key: `AIzaSyDTmFMqAgAqD4vq3srRgmA3mRuqz_fAljY`,
            onloaded : this.onEventLoaded,
            maxResults: 5,
            loadLength: 90,
            refreshTime: 20*60
        }
        this.googleCalendar = new GoogleCalendar(option);
        

        this.state = {
            events: []
        }
        
    }

    componentDidMount () {
        this.googleCalendar.load();
    }

    onEventLoaded(events){
        this.setState({events});
        console.log(this.state);
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