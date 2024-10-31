import * as types from './ActionTypes';


export const modechange = () => ({
    type : types.BACKMODECHANGE
});

export const setuserinfo = (user : types.userInfoType) => ({
    type : types.SETUSERINFO,
    user : user
    
})

export const addCategory = (key : any, data : any) =>({
    type : types.ADDCATEGORY,
    key : key,
    data : data
})

export const clearCategory = () => ({
    type : types.CLEARCATEGORY
})

export const addCategoryTag = (tagList : any) => ({
    type : types.ADDCATEGORYTAG,
    list : tagList
})