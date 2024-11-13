export const BACKMODECHANGE = 'BACKMODECHANGE';
export const SETUSERINFO = "SETUSERINFO";
export const ADDCATEGORY = "ADDCATEGORY";
export const ADDCATEGORYTAG = "ADDCATEGORYTAG";
export const CLEARCATEGORY = "CLEARCATEGORY";
export const PLUS = "PLUS";
export const MINUS = "MINUS";



// 사용자 타입 정의 (구체적인 속성으로 수정하세요)
// export interface User {
//     id: number; // 예시
//     name: string; // 예시
//     // 필요한 추가 속성
// }

// 카테고리 타입 정의
export interface Category {
    CK_KIND_NM: string;
    CK_STA_NM: string;
    CK_INPUT_NM: string;
    CK_ACT_NM: string;
}

export interface userInfoType {
    nick : string,
    email : string
}

interface BackModeChangeAction {
    type: typeof BACKMODECHANGE;
}

interface SetUserInfoAction {
    type: typeof SETUSERINFO;
    //user : any; // 타입 수정해야됨
    user: userInfoType;
}

interface AddCategoryAction {
    type: typeof ADDCATEGORY;
    key: number;
    // data : any;
    data: string; // 카테고리 데이터 타입
}

interface ClearCategoryAction {
    type: typeof CLEARCATEGORY;
}

interface AddCategoryTagAction {
    type: typeof ADDCATEGORYTAG;
    // list : any[];
    list: categoryTagType[]; // 카테고리 태그 리스트 타입
}

interface plus {
    type : typeof PLUS;
    num : number;
}

interface minus {
    type : typeof MINUS;
    num : number;
}



export interface categoryTagType {
    List: string;
    idx: number;
}

export type CategoryActionTypes =
    | BackModeChangeAction
    | SetUserInfoAction
    | AddCategoryAction
    | ClearCategoryAction
    | AddCategoryTagAction
    | plus
    | minus;




