import types from './types';


export function gesture(cmd){
    return {
        type: types.GESTURE,
        payload: cmd
    };
}

export function enableGesture(bool){
    return{
        type: types.ENABLE_GESTURE,
        payload: bool
    }
}

export function refreshEventData(eventList){
    return{
        type: types.REFRESH_EVENT,
        payload: eventList
    }
}