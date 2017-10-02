import {combineReducers} from 'redux';
import gesture from './gesture_reducer';
import eventList from './event_reducer';


export default combineReducers({gesture, eventList});