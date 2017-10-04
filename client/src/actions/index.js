import types from './types';

export function enableGesture(bool){
    return{
        type: types.ENABLE_GESTURE,
        payload: bool
    }
}

export function enableGestureControlPage(bool){
    return{
        type: types.ENABLE_GESTURE_CONTROL_PAGE,
        payload: bool
    }
}

export function refreshEventData(eventList){
    return{
        type: types.REFRESH_EVENT,
        payload: eventList
    }
}

export function setGestureCallback(callback){
    return{
        type: types.SET_GESTURE_CALLBACK,
        payload: callback
    }
}