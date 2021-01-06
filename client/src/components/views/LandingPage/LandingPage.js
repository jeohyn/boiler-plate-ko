import React, {useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'


function LandingPage(props) {

    const onClickHandler=()=>{
        axios.post('/api/users/logout')
        .then(response=>{
            console.log(response.data)
            if(response.data.success){
                props.history.push("/login")
            }else{
                alert('Failed to logout')
            }
        })
    }

    useEffect(()=>{
        axios.post('/api/hello').then(response=>console.log(response.data))
    }, [])
    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
        width:'100%', height:'100vh'}}>
            <h2>LandingPage</h2>
            <button onClick={onClickHandler}>
                logout
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
