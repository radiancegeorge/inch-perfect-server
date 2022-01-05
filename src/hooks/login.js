import useAxios from "axios-hooks"
import {useState,useEffect} from 'react'
import axios from 'axios'
import {test} from '../config/config.json'
import {Redirect} from 'react-router-dom'
const useLogin = () =>{
    const [redirect,setRedirect]=useState(false)
    const url =test;
    
    const [loginObject,setLoginObject]=useState(false)
    const [error,setError]=useState('')
    // useEffect(()=>{
    //     if(redirect){
    //        <Redirect to='/'/>
    //         // console.log('hi');
    //     }
    // },[redirect])
     const login=async (body)=>{
        setLoginObject(true)
         try {
            const { status, data } = await axios.post(`${url}user/login`, JSON.stringify(body), {
                headers: {
                    "content-type": "application/json"
                }
            });
                console.log(data)
                setLoginObject(false)
                setRedirect(true)
                localStorage.setItem('first_name',data.first_name)
                localStorage.setItem('last_name',data.last_name)
                localStorage.setItem('inchToken',data.token)
                localStorage.setItem('street',data.street)
                localStorage.setItem('code',data.postal_code)
                localStorage.setItem('state',data.state)
                localStorage.setItem('country',data.country)
                localStorage.setItem('town',data.town)
                localStorage.setItem('email',data.email)


        } catch (error) {
            
            console.log(error.response.data.error)
            setError(error.response.data.error)
            setLoginObject(false)

        }     
    }
    return{
        loginObject,login,redirect,error
    }
}
export default useLogin