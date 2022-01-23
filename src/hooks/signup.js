import useAxios from "axios-hooks"
import {useState} from 'react'
import {test} from '../config/config.json'
import axios from 'axios'

const useSignUp = () =>{
    const url=test;
    const [signUpObject,setSignUpObject]=useState()
    const [showSuccess,setShowSucess]=useState(false)
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
                setShowSucess(true)
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
       signUpObject,  signUp,showSuccess
    }
}

export default useSignUp