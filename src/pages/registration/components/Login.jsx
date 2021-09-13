import Mail from '../../../assets/svg/mail'
import EyeOff from '../../../assets/svg/eyeOff'
import Lock from '../../../assets/svg/lock'
import Eye from '../../../assets/svg/eye'
import { useState } from 'react'

const Login =({setViewToSignup})=>{
    const [eye, setEye] = useState(false)
    const toggleEyeOn = () => {
        eye ? setEye(false) : setEye(true)
    }
    return(
        <div className="register">
            <div className="header">
                <h3 className="headerBold">
                    Login
                </h3>
                <p className="headerText">
                    Please input your email address and password correctly.
                </p>
            </div>
            <form action="">
                <label htmlFor="">
                    <Mail />
                    <input type="email" name="" id="" placeholder='Email Address'/>
                </label>
                <label htmlFor="">
                    <Lock />
                    <input type={eye? "text" : 'password'} name="" id="" placeholder='Password'/>
                    {
                        eye === false && <EyeOff toggleEyeOn={toggleEyeOn}/>
                    }
                    {
                        eye && <Eye toggleEyeOn={toggleEyeOn}/>
                    }
                </label>
                <label htmlFor="" className='submitBtn'>
                    <button>
                        Login
                    </button>
                    <p className='switch'>
                        Dont have an account? 
                        <span onClick={()=>setViewToSignup()}>
                            Sign up
                        </span>
                    </p>
                </label>
            </form>
        </div>
    )
}
export default Login