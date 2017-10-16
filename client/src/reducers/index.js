import {combineReducers} from 'redux';
import leap from './leap_reducer';
import eventList from './event_reducer';


export default combineReducers({leap, eventList});