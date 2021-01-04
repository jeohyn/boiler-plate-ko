import {combineReducers} from 'redux';
import user from './user_reducer' //user reducer
//만약 comment에 대한 reducer가 있다면
//import comment from './comment_reducer' 후에 combineReducer 안에 comment 추가

//store안에 reducer가 여러개가 있을 수 있기 때문(state가 다양할 수 있음)에 root reducer로 하나로 합침.
//로그인, register 등 인증에 관한 기능=>user reducer
const rootReducer=combineReducers({
    //user,
})

export default rootReducer;