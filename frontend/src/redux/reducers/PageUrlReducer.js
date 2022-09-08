const INITIAL_STATE = "KOUKOU";

function PageUrlReducer(state = INITIAL_STATE, action) {
    if(action.type === "CHANGEURL"){
        return action.payload
    }
    return state;
};

export default PageUrlReducer;

