import * as types from '../actions/ActionTypes';

const initialState = {
    count : 0,
    name : "lsh"
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.INCREMENT:
        return {
          ...state,
          count: state.count + 1
        };
      case types.DECREMENT:
        return {
          ...state,
          count: state.count - 1
        };
      default:
        return state;
    }
  };
  
  export default counterReducer;
  
