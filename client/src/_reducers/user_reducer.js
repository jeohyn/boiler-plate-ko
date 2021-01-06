import{
    LOGIN_USER, REGISTER_USER, AUTH_USER
}from "../_action/types"

export default function (prev_state={}, action){
    switch (action.type) {
        case LOGIN_USER:
            return{...prev_state, loginSuccess: action.payload}
            break;

        case REGISTER_USER:
            return{...prev_state, register: action.payload}
            break;
        
        case AUTH_USER:
            return{...prev_state, userData: action.payload}
            break;
    
        default:
            return prev_state;
    }
}