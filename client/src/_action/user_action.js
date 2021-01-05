import axios from 'axios'
import {
    LOGIN_USER,
    REGISTER_USER
} from './types'

export function loginUser(dataToSubmit){
    const request=axios.post('/api/users/login', dataToSubmit)
    .then(response=>response.data)

    //reducer로 action(여기서는 request)전송
    return{
        type: LOGIN_USER,
        payload:request
    }
}

export function registerUser(dataToSubmit){
    const request=axios.post('/api/users/register', dataToSubmit)
    .then(response=>response.data)

    //reducer로 action(여기서는 request)전송
    return{
        type: REGISTER_USER,
        payload:request
    }
}