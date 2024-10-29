import * as types from '../actions/ActionTypes';

const initialState = {
    isLogin: false,
    backMode: false,
    user: null,
    category: {
        CK_KIND_NM : "전체", // 종류별
        CK_STA_NM : "전체", // 상황별
        CK_INPUT_NM : "전체", // 재료별
        CK_ACT_NM : "전체", // 방법별
    },
    categoryTag : []
}

const counterReducer = (state = initialState, action : types.CategoryActionTypes) => {
    switch (action.type) {
        case types.BACKMODECHANGE:
            return {
                ...state,
                backMode: !state.backMode,
            }
        case types.SETUSERINFO:
            return {
                ...state,
                isLogin: !state.isLogin,
                user: action.user,
            }
        case types.ADDCATEGORY:
            let dic = {
                ...state.category
            }
            switch(action.key)
            {
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
            }

            return {
                ...state,
                category: dic
            }
        case types.CLEARCATEGORY:
            console.log("clear")
            let cleandic = {
                ...state.category
            }
            cleandic.CK_ACT_NM = "전체";
            cleandic.CK_INPUT_NM = "전체";
            cleandic.CK_KIND_NM = "전체";
            cleandic.CK_STA_NM = "전체";
            return {
                ...state,
                category : cleandic
            }

        case types.ADDCATEGORYTAG:
            console.log(action.list)
            return {
                ...state,
                categoryTag : [...action.list]
            }
        default:
            return state;
    }
};

export default counterReducer;

export type RootState = ReturnType<typeof counterReducer>;