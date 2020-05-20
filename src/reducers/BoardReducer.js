const initialState = {
    currBoard: null,
    boards: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, currBoard: action.board 
            }
        default:
            return state;
    }
}
