import types from '../actions/types';

const DEFAULT_STATE = {cmd: null, enable:false};

export default function(state = DEFAULT_STATE, action){
    console.log("redu");
    console.log(action);
    switch(action.type){
        case types.GESTURE:
            return {...state, cmd: action.payload};
        case types.ENABLE_GESTURE:
            return {...state, enable: action.payload, cmd: null};
        default :
            return state;
    }
}