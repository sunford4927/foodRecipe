export const BACKMODECHANGE = 'BACKMODECHANGE';
export const SETUSERINFO = "SETUSERINFO";
export const ADDCATEGORY = "ADDCATEGORY";
export const ADDCATEGORYTAG = "ADDCATEGORYTAG";
export const CLEARCATEGORY = "CLEARCATEGORY";

interface BackModeChangeAction {
    type : typeof BACKMODECHANGE;
}

interface SetUserInfoAction {
    type : typeof SETUSERINFO;
    user : any; // 타입 수정해야됨
}

interface AddCategoryAction{
    type : typeof ADDCATEGORY;
    key : number;
    data : any;
}

interface ClearCategoryAction{
    type : typeof CLEARCATEGORY;
}

interface AddCategoryTagAction{
    type : typeof ADDCATEGORYTAG;
    list : any[];
}

export type CategoryActionTypes = 
    | BackModeChangeAction
    | SetUserInfoAction
    | AddCategoryAction
    | ClearCategoryAction
    | AddCategoryTagAction;
