import Logo from '../../assets/png/logo.png'
import ContainerImage from '../../assets/png/containerImage.png'
import './signup.css'
import { useState } from 'react'
import SignUp from './components/Signup'
import Login from './components/Login'
import RegistrationSuccessful from './components/registrationSuccessful'
const Registration = () => {
    const [view, setView] = useState('Log in')
    const setViewToLogin = () => {
        setView('Log in')
    }
    const setViewToSignup = () => {
        setView('Sign Up')
    }
    return(
        <div className='container'>
            <div className='leftContainer'>
                <img src={ContainerImage} alt="Background Image" className='leftContainerBackgroundImage'/>
                <img src={Logo} alt="Logo" className='Logo'/>
                <div className='overlay'></div>
            </div>
            <div className='rightContainer'>
                {
                    view === 'Sign Up' && (
                        <SignUp setViewToLogin={setViewToLogin}/>
                    )
                }
                {
                    view === 'Log in' && (
                        <Login setViewToSignup={setViewToSignup}/>
                    )
                }
                {
                    view === 'Registration Successful' && (
                        <RegistrationSuccessful setViewToLogin={setViewToLogin}/>
                    )
                }
            </div>
        </div>
    )
}
export default Registration