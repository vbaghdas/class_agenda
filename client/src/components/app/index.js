import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Header from '../header';
import Home from '../home';
import Events from '../events';
import Calendar from '../calendar';
import About from '../about';
import Background from '../background';

import GoogleCalendar from './google_calendar';
import Timer from './helper/timer';
import Leap from './leap_motion';
import Dispatcher from './helper/dispatcher';

//should make a timer outside the google calendar class
class App extends Component {

    constructor(props){
        super(props);
        this.onEventLoaded = this.onEventLoaded.bind(this);
        this.googleCalendar = new GoogleCalendar(this.onEventLoaded);
        this.Timer = new Timer(this.googleCalendar.load, this.googleCalendar.option.refreshTime);
        this.dispatcher = new Dispatcher();
        this.Leap = new Leap(this.dispatcher);
        this.dispatcher.dispatch("startRecogniseGesture");

        //should move all the page control into a new file
        this.dispatcher.addListener("swipe_-x", this.pressLeftArrow.bind(this));
        this.dispatcher.addListener("swipe_x", this.pressRightArrow.bind(this));

        this.state = {
            events: []
        }
        
    }

    pressLeftArrow(){
        var e = new Event("keydown");
        e.which = 39;
        document.dispatchEvent(e);
        setTimeout(()=>{this.dispatcher.dispatch("startRecogniseGesture")},1000);
    }

    pressRightArrow(){
        var e = new Event("keydown");
        e.which = 37;
        document.dispatchEvent(e);
        setTimeout(()=>{this.dispatcher.dispatch("startRecogniseGesture")},1000);
    }


    componentDidMount () {
        this.googleCalendar.load();
        this.Timer.start();
    }

    onEventLoaded(events){
        this.setState({events,loaded:true});
        console.log("this is the state",this.state);
    }

    render() {
        return (
            <div>
                <Header />
                <Route exact path="/" component={Home} />
                <Route path="/events" render={ routeData => {
                    return <Events {...routeData} events={this.state.events} loaded={this.state.loaded} />
                }} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/about" component={About} />
                <Background />
            </div>
        )
    }
}

export default App;