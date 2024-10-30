// redux/reducer/index.ts

import * as types from '../actions/ActionTypes';


// 상태 타입 정의
interface State {
    isLogin: boolean;
    backMode: boolean;
    user: types.User | null; // 사용자 타입을 명확히
    category: types.Category;
    categoryTag: string[]; // 필요한 경우 구체적인 타입으로 변경
}

// 초기 상태 정의
const initialState: State = {
    isLogin: false,
    backMode: false,
    user: null,
    category: {
        CK_KIND_NM: '전체',
        CK_STA_NM: '전체',
        CK_INPUT_NM: '전체',
        CK_ACT_NM: '전체',
    },
    categoryTag: [],
};

const counterReducer = (state: State = initialState, action: types.CategoryActionTypes): State => {
    switch (action.type) {
        case types.BACKMODECHANGE:
            return {
                ...state,
                backMode: !state.backMode,
            };
        case types.SETUSERINFO:
            return {
                ...state,
                isLogin: !state.isLogin,
                user: action.user, // user가 null일 수도 있음
            };
        case types.ADDCATEGORY:
            let dic = { ...state.category };
            switch (action.key) {
                case 1:
                    dic.CK_KIND_NM = action.data;
                    break;
                case 2:
                    dic.CK_STA_NM = action.data;
                    break;
                case 3:
                    dic.CK_INPUT_NM = action.data;
                    break;
                case 4:
                    dic.CK_ACT_NM = action.data;
                    break;
                default:
                    break; // 예외 처리
            }

            return {
                ...state,
                category: dic,
            };
        case types.CLEARCATEGORY:
            console.log("clear");
            return {
                ...state,
                category: {
                    CK_KIND_NM: "전체",
                    CK_STA_NM: "전체",
                    CK_INPUT_NM: "전체",
                    CK_ACT_NM: "전체",
                },
            };

        case types.ADDCATEGORYTAG:
            console.log(action.list);
            return {
                ...state,
                categoryTag: [...action.list], // 여기서도 타입 체크 필요
            };
        default:
            return state;
    }
};

export default counterReducer;

export type RootState = ReturnType<typeof counterReducer>;


// import * as types from '../actions/ActionTypes';

// const initialState = {
//     isLogin: false,
//     backMode: false,
//     user: null,
//     category: {
//         CK_KIND_NM : "전체", // 종류별
//         CK_STA_NM : "전체", // 상황별
//         CK_INPUT_NM : "전체", // 재료별
//         CK_ACT_NM : "전체", // 방법별
//     },

//     categoryTag : []
// }

// const counterReducer = (state = initialState, action : types.CategoryActionTypes) => {
//     switch (action.type) {
//         case types.BACKMODECHANGE:
//             return {
//                 ...state,
//                 backMode: !state.backMode,
//             }
//         case types.SETUSERINFO:
//             return {
//                 ...state,
//                 isLogin: !state.isLogin,
//                 user: action.user,
//             }
//         case types.ADDCATEGORY:
//             let dic = {
//                 ...state.category
//             }
//             switch(action.key)
//             {
//                 case 1:
//                     dic.CK_KIND_NM = action.data;
//                     break;
//                 case 2:
//                     dic.CK_STA_NM = action.data;
//                     break;
//                 case 3:
//                     dic.CK_INPUT_NM = action.data;
//                     break;
//                 case 4:
//                     dic.CK_ACT_NM = action.data;
//                     break;
//             }

//             return {
//                 ...state,
//                 category: dic
//             }
//         case types.CLEARCATEGORY:
//             console.log("clear")
//             let cleandic = {
//                 ...state.category
//             }
//             cleandic.CK_ACT_NM = "전체";
//             cleandic.CK_INPUT_NM = "전체";
//             cleandic.CK_KIND_NM = "전체";
//             cleandic.CK_STA_NM = "전체";
//             return {
//                 ...state,
//                 category : cleandic
//             }

//         case types.ADDCATEGORYTAG:
//             console.log(action.list)
//             return {
//                 ...state,
//                 categoryTag : [...action.list]
//             }
//         default:
//             return state;
//     }
// };

// export default counterReducer;

// export type RootState = ReturnType<typeof counterReducer>;