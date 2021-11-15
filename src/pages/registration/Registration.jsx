import Logo from '../../assets/png/logo.png'
import ContainerImage from '../../assets/png/containerImage.png'
import './signup.css'
import { useState } from 'react'
import SignUp from './components/Signup'
import Login from './components/Login'
import RegistrationSuccessful from './components/registrationSuccessful'
import VerificationSuccessful from './components/verificationSuccessful'
const Registration = () => {
    const [view, setView] = useState('Sign Up')
    console.log(view)
    return(
        <div className='container'>
            <div className='leftContainer'>
                <img src={ContainerImage} alt="Background" className='leftContainerBackgroundImage'/>
                <img src={Logo} alt="Logo" className='Logo'/>
                <div className='overlay'></div>
            </div>
            <div className='rightContainer'>
                {
                    view === 'Sign Up' && (
                        <SignUp setView={setView}/>
                    )
                }
                {
                    view === 'Log in' && (
                        <Login setView={setView}/>
                    )
                }
                {
                    view === 'Registration Successful' && (
                        <RegistrationSuccessful setView={setView}/>
                    )
                }
                {
                    view === 'Verification Successful' && (
                        <VerificationSuccessful setView={setView}/>
                    )
                }
            </div>
        </div>
    )
}
export default Registration