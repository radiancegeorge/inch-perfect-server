import User from '../../../assets/svg/user'
import Mail from '../../../assets/svg/mail'
import EyeOff from '../../../assets/svg/eyeOff'
import Lock from '../../../assets/svg/lock'
import Eye from '../../../assets/svg/eye'
import { useState } from 'react'
import Loader from "react-loader-spinner";
import useSignUp from '../../../hooks/signup'

const SignUp = ({setView}) =>{
    const [eye, setEye] = useState(false)
    const toggleEyeOn = () => {
        eye ? setEye(false) : setEye(true)
    }
    const [userData, setUserData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:''
    })
    const {signUpObject, signUp} = useSignUp()
    const handleSignUp = e =>{
        e.preventDefault();
        console.log(userData)
        try{
            signUp(
                {
                    data: userData
                }
            )
        }
        catch(err){
            console.log(err)
        }
        

    }
    console.log(signUpObject)
    if(signUpObject){
        signUpObject?.response?.status === 200 && setView('Registration Successful')
    }
    // console.log(userData)
    return(
        <div className='register'>
            <div className="header">
                <h3 className="headerBold">
                    Create Account
                </h3>
                <p className="headerText">
                    Please input your email address and password correctly.
                </p>
            </div>
            <form action="" onSubmit={handleSignUp}>
                <label htmlFor="">
                    <User width='18px' fill='#797774' stroke='#797774'/>
                    <input type="text" name="first_name" placeholder='First Name' onChange={e=>setUserData({...userData,first_name:e.target.value})} required/>
                </label>
                <label htmlFor="">
                    <User width='18px' fill='#797774' stroke='#797774'/>
                    <input type="text" name="last_name" placeholder='Last Name' onChange={e=>setUserData({...userData,last_name:e.target.value})} required/>
                </label>
                <label htmlFor="">
                    <Mail />
                    <input type="email" name="email" id="" placeholder='Email Address' onChange={e=>setUserData({...userData,email:e.target.value})} required/>
                </label>
                <label htmlFor="">
                    <Lock />
                    <input type={eye? "text" : 'password'} name="password" id="" placeholder='Password' onChange={e=>setUserData({...userData,password:e.target.value})} required/>
                    {
                        eye === false && <EyeOff toggleEyeOn={toggleEyeOn}/>
                    }
                    {
                        eye && <Eye toggleEyeOn={toggleEyeOn}/>
                    }
                </label>
                <label htmlFor="" className='submitBtn'>
                    <button>
                        Register {
                            signUpObject.loading && <Loader type="Circles" color="#FFF" height={10} width={10}/>
                        }
                    </button>
                    <p className='switch'>
                        Already have an account? 
                        <span onClick={()=>setView('Log in')}>
                            Login
                        </span>
                    </p>
                </label>
            </form>
            
        </div>
    )
}
export default SignUp