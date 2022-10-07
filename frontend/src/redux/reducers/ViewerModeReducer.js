const INITIAL_STATE = {
    toggle: false,
    photo: ""
};

function ViewerModeReducer(state = INITIAL_STATE, action) {
    if(action.type === "CHANGEVIEWERMODE"){
        return action.payload
    }
    return state;
};

export default ViewerModeReducer;

