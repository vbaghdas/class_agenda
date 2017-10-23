import types from '../actions/types';

const DEFAULT_STATE = {cmd: null, enable:false, controllable:null};

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.SET_GESTURE_CALLBACK:
            return {...state, callback: action.payload};
        case types.ENABLE_GESTURE:
            return {...state, enable: action.payload, cmd: null};
        case types.ENABLE_GESTURE_CONTROL_PAGE:
            return {...state, controllable: action.payload};
        case types.ENABLE_GESTURE_GAMEMODE:
            return {...state, gamemode: action.payload};
        default :
            return state;
    }
}