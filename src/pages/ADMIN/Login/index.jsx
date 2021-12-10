import Logo from '../../../assets/png/logo.png'
import ContainerImage from '../../../assets/png/containerImage.png'
import EyeOff from '../../../assets/svg/eyeOff'
import Lock from '../../../assets/svg/lock'
import Eye from '../../../assets/svg/eye'
import { useState ,useEffect,useRef } from 'react'
import {test} from '../../../config/config.json'
import axios from 'axios'
import {Link} from 'react-router-dom'


const Registration = () => {
    const url=test;
 const [eye, setEye] = useState(false)
    const toggleEyeOn = () => {
        eye ? setEye(false) : setEye(true)
    }
    const [userLoginData, setUserLoginData] = useState({
        email:'victorkhachi@gmail.com',
        password:''
    })
    const linkRef =useRef(null)

    // useEffect(()=>redirect?linkRef.current.click():'',[redirect])
    const handleLogin = async (e) => {
        e.preventDefault();
         try {
            const { status, data } = await axios.post(`${url}user/login`, JSON.stringify(userLoginData), {
                headers: {
                    "content-type": "application/json"
                }
            });
                console.log(data)
               
                localStorage.setItem('inchToken',data.token)
                linkRef.current.click()


        } 
        catch (error) {
            
            console.log(error.response.data.error)
    

        }     
    }
        
       
    

    return(
        <div className='container'>
         <Link ref={linkRef} to='/admin/products' style={{display:'none'}} />

            <div className='leftContainer'>
                <img src={ContainerImage} alt="Background" className='leftContainerBackgroundImage'/>
                <img src={Logo} alt="Logo" className='Logo'/>
                <div className='overlay'></div>
            </div>
            <div className='rightContainer'>
              <div class='register'>
                <div class='header'>
                   <h3 class='headerBold'>Admin Dashboard</h3>
                   <p className="headerText">
                         put in your password to log into you dashboard.
                     </p>
                </div>
            <form onSubmit={handleLogin}>
                <label htmlFor="">
                    <Lock />
                    <input  onChange={e=>setUserLoginData({...userLoginData, password:e.target.value})} type={eye? "text" : 'password'} name="password" id="" placeholder='Password'/>
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
                   
                    
                </label>
            </form>
               </div> 
            </div>
        </div>
    )
}
export default Registration