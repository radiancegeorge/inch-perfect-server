import Mail from '../../../assets/svg/mail'
import EyeOff from '../../../assets/svg/eyeOff'
import Lock from '../../../assets/svg/lock'
import Eye from '../../../assets/svg/eye'
import { useState ,useEffect,useRef } from 'react'
import useLogin from '../../../hooks/login'
import { Router, Redirect} from 'react-router'
import Loader from "react-loader-spinner";
import {Link} from 'react-router-dom'


const Login =({setView})=>{
    const {login, loginObject,redirect,error} = useLogin()
    const [eye, setEye] = useState(false)
    const toggleEyeOn = () => {
        eye ? setEye(false) : setEye(true)
    }
    const [userLoginData, setUserLoginData] = useState({
        email:'',
        password:''
    })
    const linkRef =useRef(null)
    useEffect(()=>redirect?linkRef.current.click():'',[redirect])
    const handleLogin = e => {
        e.preventDefault();
        console.log(userLoginData)
        login(userLoginData)
        // try{
        //     login(
        //         {
        //             data: userLoginData
        //         }
        //     )
        // }
        // catch(err){
        //     console.log(err)
        // }
    }
    return(

        <div className="register">
        <Link ref={linkRef} to='/' style={{display:'none'}} />
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
               {error && <p style={{width:'100%',textAlign:'center',fontWeight:'100',fontSize:'10px'}}>{error}</p>}
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
                    <p className='switch'>
                        forgot password? 
                        <Link to='/reset-password'>
                            reset
                        </Link>
                    </p>
                </label>
            </form>
        </div>
    )
}
export default Login