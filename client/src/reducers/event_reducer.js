import types from '../actions/types';

const DEFAULT_STATE = {eventList: null};

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.REFRESH_EVENT:
            return {...state, eventList: action.payload};
        default :
            return state;
    }
}