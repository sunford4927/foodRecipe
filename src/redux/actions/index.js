import * as types from './ActionTypes';

export const modechange = () => ({
    type : types.BACKMODECHANGE
});

export const setuserinfo = (user) => ({
    type : types.SETUSERINFO,
    user : user
    
})

export const addCategory = (key, data) =>({
    type : types.ADDCATEGORY,
    key : key,
    data : data
})

export const clearCategory = () => ({
    type : types.CLEARCATEGORY
})

export const addCategoryTag = (tagList) => ({
    type : types.ADDCATEGORYTAG,
    list : tagList
})