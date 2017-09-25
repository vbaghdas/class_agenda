import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Header from './header';
import Home from './home/home';
import Events from './events/events';
import Calendar from './calendar';
import About from './about';
import Background from './background/background';

import { getEvents } from './gcal';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            events: []
        }
    }

    componentDidMount () {
        getEvents((events) => {
            this.setState({events})
            console.log(events);
        })
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