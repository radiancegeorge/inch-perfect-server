import useAxios from "axios-hooks"
import {useState} from 'react'
import {test} from '../config/config.json'
import axios from 'axios'

const useSignUp = () =>{
    const url=test;
    const [signUpObject,setSignUpObject]=useState()
    const signUp=async (body)=>{
        setSignUpObject(true)
         try {
            const { status, data } = await axios.post(`${url}user/register`, JSON.stringify(body), {
                headers: {
                    "content-type": "application/json"
                }
            });
                console.log(data)
                setSignUpObject(false)
        } catch (error) {
            
            console.log(error.response.data.error)
                setSignUpObject(false)

        }     
    }
    // const [{...signUpObject}, signUp] = useAxios({
    //     url: "/user/register",
    //     method: "post"
    // },{
    //     manual: true
    // })
    return{
       signUpObject,  signUp
    }
}

export default useSignUp