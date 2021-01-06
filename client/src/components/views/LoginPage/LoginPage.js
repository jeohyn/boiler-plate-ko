import axios from 'axios'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_action/user_action'
import {withRouter} from 'react-router-dom'

function LoginPage(props) {
    const dispatch=useDispatch()

    //email을 위한 state 생성
    const[Email, setEmail]=useState("")
    //passsword를 위한 state 생성
    const[Password, setPassword]=useState("")

    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler=(event)=>{
        //이 코드가 없으면 코드 실행이 없어도 버튼 누르기만 하면 페이지 refresh
        event.preventDefault()
        
        let body={
            email:Email,
            password:Password
        }

        //action 전송
        dispatch(loginUser(body))
        .then(response=>{
            if(response.payload.loginSuccess){
                //react에서 페이지 이동시키는 방법
                props.history.push('/')
                }else{
                    alert('Error')
                }
            }
        )
    }

    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
        width:'100%', height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
