import Mail from '../../../assets/svg/mail'
import EyeOff from '../../../assets/svg/eyeOff'
import Lock from '../../../assets/svg/lock'
import Eye from '../../../assets/svg/eye'
import { useState } from 'react'
import useLogin from '../../../hooks/login'
import { Router, Redirect} from 'react-router'
import Loader from "react-loader-spinner";


const Login =({setView})=>{
    const {login, loginObject} = useLogin()
    const [eye, setEye] = useState(false)
    const toggleEyeOn = () => {
        eye ? setEye(false) : setEye(true)
    }
    const [userLoginData, setUserLoginData] = useState({
        email:'',
        password:''
    })
    const handleLogin = e => {
        e.preventDefault();
        console.log(userLoginData)
        try{
            login(
                {
                    data: userLoginData
                }
            )
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <div className="register">
            {/* {
                loginObject.error === null && <Redirect to='/'/>
            } */}
            
            <div className="header">
                <h3 className="headerBold">
                    Login
                </h3>
                <p className="headerText">
                    Please input your email address and password correctly.
                </p>
            </div>
            <form action="" onSubmit={handleLogin}>
                <label htmlFor="">
                    <Mail />
                    <input onChange={e=>setUserLoginData({...userLoginData, email:e.target.value})} type="email" name="email" id="" placeholder='Email Address'/>
                </label>
                <label htmlFor="">
                    <Lock />
                    <input onChange={e=>setUserLoginData({...userLoginData, password:e.target.value})} type={eye? "text" : 'password'} name="password" id="" placeholder='Password'/>
                    {
                        eye === false && <EyeOff toggleEyeOn={toggleEyeOn}/>
                    }
                    {
                        eye && <Eye toggleEyeOn={toggleEyeOn}/>
                    }
                </label>
                <label htmlFor="" className='submitBtn'>
                    <button>
                        Login{
                            loginObject.loading && <Loader type="Circles" color="#FFF" height={10} width={10}/>
                        }
                    </button>
                    <p className='switch'>
                        Dont have an account? 
                        <span onClick={()=>setView('Sign Up')}>
                            Sign up
                        </span>
                    </p>
                </label>
            </form>
        </div>
    )
}
export default Login