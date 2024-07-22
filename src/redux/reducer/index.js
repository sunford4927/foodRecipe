import * as types from '../actions/ActionTypes';

const initialState = {
    user : { auth : null, id : ""},
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
          console.log(1);
          return {
            ...state,
            
          }
      default:
        return state;
    }
  };
  
  export default counterReducer;
  
