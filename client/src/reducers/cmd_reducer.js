import types from '../actions/types';

const DEFAULT_STATE = {cmd: ""};

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.cmd:
            return {...state, cmd: action.payload};
        default :
            return state;
    }
}