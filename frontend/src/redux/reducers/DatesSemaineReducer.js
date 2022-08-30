const INITIAL_STATE = {
    
};

function DatesSemaineReducer(state = INITIAL_STATE, action) {
    if(action.type === "CHANGEDATES"){
        return action.payload
    }
    return state;
};

export default DatesSemaineReducer;

