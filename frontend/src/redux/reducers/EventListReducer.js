const INITIAL_STATE = [];

function EventListReducer(state = INITIAL_STATE, action) {
    if(action.type === "ADDEVENTDATA"){
        return action.payload
    }
    return state;
};

export default EventListReducer;

