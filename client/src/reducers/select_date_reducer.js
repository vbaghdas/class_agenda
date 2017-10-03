import types from '../actions/types';

const DEFAULT_STATE = {date: null};

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.SELECT_DATE:
            return {...state, date: action.payload};
        default :
            return state;
    }
}