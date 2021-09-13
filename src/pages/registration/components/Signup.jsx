import User from '../../../assets/svg/user'
import Mail from '../../../assets/svg/mail'
import EyeOff from '../../../assets/svg/eyeOff'
import Lock from '../../../assets/svg/lock'
import Eye from '../../../assets/svg/eye'
import { useState } from 'react'


const SignUp = ({setViewToLogin}) =>{
    const [eye, setEye] = useState(false)
    const toggleEyeOn = () => {
        eye ? setEye(false) : setEye(true)
    }
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
            <form action="">
                <label htmlFor="">
                    <User width='18px' fill='#797774' stroke='#797774'/>
                    <input type="text" name="" placeholder='First Name' />
                </label>
                <label htmlFor="">
                    <User width='18px' fill='#797774' stroke='#797774'/>
                    <input type="text" name="" placeholder='Last Name' />
                </label>
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
                        Register
                    </button>
                    <p className='switch'>
                        Already have an account? 
                        <span onClick={()=>setViewToLogin()}>
                            Login
                        </span>
                    </p>
                </label>
            </form>
            
        </div>
    )
}
export default SignUp