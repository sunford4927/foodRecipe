import * as types from './ActionTypes';

export const increment = () => ({
    type : types.INCREMENT
});

export const decrement = () => ({
    type : types.DECREMENT
});

export const modechange = () => ({
    type : types.BACKMODECHANGE
});