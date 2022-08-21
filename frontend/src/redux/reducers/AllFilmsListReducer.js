const INITIAL_STATE = [];

function AllFilmsListReducer(state = INITIAL_STATE, action) {
    if(action.type === "ADDALLDATA"){
        return action.payload
    }
    return state;
};

export default AllFilmsListReducer;

