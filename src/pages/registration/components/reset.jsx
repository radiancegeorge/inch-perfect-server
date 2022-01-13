import Logo from '../../../assets/png/logo.png'
import ContainerImage from '../../../assets/png/containerImage.png'
import '../signup.css'
import { useState } from 'react'
import Eye from '../../../assets/svg/eye'
import EyeOff from '../../../assets/svg/eyeOff'
import Lock from '../../../assets/svg/lock'
import Mail from '../../../assets/svg/mail'
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {test} from '../../../config/config.json'
import { useRef } from 'react'



const Reset = () => {
    const url =test
    const [error,setError]=useState()
    const [otpObject,setOtpObject]=useState(false)
    const [userResetData,setUserResetData]=useState({
        email:'',
        new_password:'',
        re_new_password:''
    })
    const [eye, setEye] = useState(false)
    const toggleEyeOn = () => {
        eye ? setEye(false) : setEye(true)
    }
    const [showOtp,setShowOtp]=useState(false)
    const [otp,setOtp]=useState({
        server:'',entered:''
    })
    const getOtp=async (body)=>{
        setOtpObject(true)
         try {
            const { status, data } = await axios.post(`${url}user/otp`, JSON.stringify(body), {
                headers: {
                    "content-type": "application/json"
                    
                }
            });
                setOtp({...otp,server:data.otp})
                setOtpObject(false)
                setShowOtp(true)
                console.log(data)
               


        } catch (error) {
            
        
            setError(error.response.data.error)
            setOtpObject(false)

        }     
    }
    console.log(otp);
    const signIn=useRef(null)
    const ResetPassword=async (body)=>{
        setOtpObject(true)
         try {
            const { status, data } = await axios.patch(`${url}user/`, JSON.stringify(body), {
                headers: {
                    "content-type": "application/json"
                    
                }
            });
                
                setOtpObject(false)
                console.log(data)
                signIn.current.click()


        } catch (error) {
            
            console.log(error.response.data.error)
            setError(error.response.data.error)
            setOtpObject(false)

        }     
    }
    return(
        <div className='container'>
            
            <div className='leftContainer'>
                <img src={ContainerImage} alt="Background" className='leftContainerBackgroundImage'/>
                <img src={Logo} alt="Logo" className='Logo'/>
                <div className='overlay'></div>
            </div>
            {!showOtp &&  <div className='rightContainer'>
            <div className="register">
            
            {/* {
                loginObject.error === null && <Redirect to='/'/>
            } */}
            
            <div className="header">
                <h3 className="headerBold">
                    Reset Password
                </h3>
                <p className="headerText">
                    Please input your email address and new password correctly.
                </p>
            </div>
            <form onSubmit={e=>{
                e.preventDefault()
                if(userResetData.email.trim()===''||userResetData.new_password.trim()===''||userResetData.re_new_password.trim()===''){
                   setError('empty field not allowed')
                }
                else getOtp({email:userResetData.email})
            }} >
               {error && <p style={{width:'100%',textAlign:'center',fontWeight:'100',fontSize:'10px'}}>{error}</p>}
                <label htmlFor="">
                    <Mail />
                    <input onChange={e=>setUserResetData({...userResetData, email:e.target.value})} type="email" name="email" id="" placeholder='Email Address'/>
                </label>
                <label htmlFor="">
                    <Lock />
                    <input onChange={e=>setUserResetData({...userResetData, new_password:e.target.value})} type={eye? "text" : 'password'} name="password" id="" placeholder='Password'/>
                    {
                        eye === false && <EyeOff toggleEyeOn={toggleEyeOn}/>
                    }
                    {
                        eye && <Eye toggleEyeOn={toggleEyeOn}/>
                    }
                </label>
                <label htmlFor="">
                    <Lock />
                    <input onChange={e=>setUserResetData({...userResetData, re_new_password:e.target.value})} type={eye? "text" : 'password'} name="password" id="" placeholder='Password'/>
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
                         otpObject && <Loader type="Circles" color="#FFF" height={10} width={10}/>
                        }
                    </button>
                    <p className='switch'>
                        Remember Password? 
                        <Link  to ='/auth'>
                            Sign up
                        </Link>
                    </p>
                  
                </label>
            </form>
           
        </div>
            </div>}
            { showOtp &&  <div className='rightContainer'>
            <div className="register">
            
            {/* {
                loginObject.error === null && <Redirect to='/'/>
            } */}
            
            <div className="header">
                <h3 className="headerBold">
                    OTP
                </h3>
                <p className="headerText">
                    Enter the OTP sent to your mail.
                    <Link ref={signIn} style={{display:'none'}} to ='/auth'>
                            
                        </Link>
                </p>
            </div>
            <form onSubmit={e=>{
                e.preventDefault()

                if(`${otp.server}`===otp.entered){
                    ResetPassword(userResetData)
                }
                else{
                    setError('wrong OTP enterd')
                }
            }} >
               {error && <p style={{width:'100%',textAlign:'center',fontWeight:'100',fontSize:'10px'}}>{error}</p>}
                <label htmlFor="">
                    <input onChange={e=>setOtp({...otp,entered:e.target.value})} type="tel" name="tel" id="" placeholder='OTP'/>
                </label>
                <label htmlFor="" className='submitBtn'>
                    <button>
                        change password{
                           otpObject   && <Loader type="Circles" color="#FFF" height={10} width={10}/>
                        }
                    </button>
                   
                </label>
            </form>
            </div>
            </div>
           }
        </div>

    )
}
export default Reset