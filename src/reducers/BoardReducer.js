const initialState = {
    boards: []
  };
  
  export default function(state = initialState, action = {}) {
    switch (action.type) {
      case 'SET_BOARD':
        return { ...state, boards: action.reviews };
      default:
        return state;
    }
  }
  