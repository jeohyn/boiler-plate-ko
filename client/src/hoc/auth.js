import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {auth} from '../_action/user_action'

export default function(SpecificComponent, option, adminRoute=null){
    //option
    //null:everyone
    //true:only login users
    //false:everyon except login users
    //if you want to allow connect only for admin users, adminRoute=true
    function AuthenticationCheck(props){
        const dispatch=useDispatch()
        useEffect(()=>{
            //dispatch() : backend에 request전송(여기선 auth())
            dispatch(auth()).then(response =>{
                console.log(response)

                //state:login X
                if(!response.payload.isAuth){
                    //user who's not login want to connect page that only login users can connect
                    if(option){ 
                        props.history.push('/login')
                    }
                }else{ //state:login
                     //if not Admin login user want to connect page that can only allow for admin users
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }
                    else{
                        //if login user want to connect a page that allow for un-login users
                        if(!option){
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])
        return (
            <SpecificComponent/>
        )
    }


    return AuthenticationCheck
}