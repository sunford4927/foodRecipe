import * as types from '../actions/ActionTypes';

const initialState = {
    user : { user : null, id : ""},
    backMode : false,
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.BACKMODECHANGE:
        return {
          ...state,
          backMode : !state.backMode,
        }
        case types.SETUSERINFO:
          return {
            ...state,
            
          }
      default:
        return state;
    }
  };
  
  export default counterReducer;
  
