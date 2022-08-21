const INITIAL_STATE = [];

function CircuitFilmListReducer(state = INITIAL_STATE, action) {
    if(action.type === "ADDCIRCUITDATA"){
        return action.payload
    }
    return state;
};

export default CircuitFilmListReducer;

