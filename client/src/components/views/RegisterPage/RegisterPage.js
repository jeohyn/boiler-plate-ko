import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_action/user_action'

function RegisterPage(props) {
    const dispatch=useDispatch()

    //email을 위한 state 생성
    const[Email, setEmail]=useState("")
    //passsword를 위한 state 생성
    const[Password, setPassword]=useState("")
    //name을 위한 state 생성
    const[Name, setName]=useState("")
    //confirmPasssword를 위한 state 생성
    const[ConfirmPassword, setConfirmPassword]=useState("")

    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value)
    }

    const onNameHandler=(event)=>{
        setName(event.currentTarget.value)
    }

    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }


    const onConfirmPasswordHandler=(event)=>{
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler=(event)=>{
        //이 코드가 없으면 코드 실행이 없어도 버튼 누르기만 하면 페이지 refresh
        event.preventDefault()
        
        if(Password!==ConfirmPassword){
            return alert('confirm password and password should be same')
        }

        let body={
            name:Name,
            email:Email,
            password:Password
        }

        //action 전송
        dispatch(registerUser(body))
        .then(response=>{
            if(response.payload.success){
                //react에서 페이지 이동시키는 방법
                props.history.push('/login')
                }else{
                    alert('Failed to sign up')
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
                
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                
                <label>Comfirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                

                <br/>
                <button>
                    Join
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
