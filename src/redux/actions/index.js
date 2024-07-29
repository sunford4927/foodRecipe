import * as types from './ActionTypes';

export const modechange = () => ({
    type : types.BACKMODECHANGE
});

export const setuserinfo = (user) => ({
    type : types.SETUSERINFO,
    user : user
    
})