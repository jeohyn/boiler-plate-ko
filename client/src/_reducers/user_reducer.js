import{
    LOGIN_USER
}from "../_action/types"

export default function (prev_state={}, action){
    switch (action.type) {
        case LOGIN_USER:
            return{...prev_state, loginSuccess: action.payload}
            break;
    
        default:
            return prev_state;
    }
}