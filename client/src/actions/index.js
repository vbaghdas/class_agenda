import types from './types';


export function excute(cmd){
    return {
        type: types.cmd,
        payload: cmd
    };
}