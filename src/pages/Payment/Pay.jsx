import React from 'react'
import Logo from '../../assets/png/logo.png'
import YellowInstagram from '../../assets/svg/YellowInstagram'
import YellowLinkedIn from '../../assets/svg/YellowLinkedIn'
import YellowTweet from '../../assets/svg/YellowTweet'
import Success from '../../assets/svg/Success'
import NavBar from '../navbar'
import YellowFacebook from '../../assets/svg/YellowFacebook'
import Time from '../../assets/svg/Time'
import SelectImage from '../../assets/svg/SelectImage'
import Copy from '../../assets/svg/Copy'
import ContainerImage from '../../assets/png/containerImage.png'
import './pay.scss'
import {Link} from 'react-router-dom'
import { useState } from 'react'


const Pay = () => {
     const homeLink=React.useRef(null) 
     const uploadRef=React.useRef(null)

     const [done,setDone]=useState(false)
    return(
        <div className='pay containerr '>
        <div class='nav'><NavBar nav='navbar2' display='none' /></div>
            <div className='leftContainer'>
                <img src={ContainerImage} alt="Background" className='leftContainerBackgroundImage'/>
                {/* <img src={Logo} alt="Logo" className='Logo'/> */}
                <div class='write'>
                   
                    <div class='thanks'>Thanks for your patronage
                        <span>Your goods are on their way to you</span>
                   </div>

                   <div class='images'>
                       
                   </div>
                </div>
                <div class='bottom'><span class='copy_right'>© Inch perfect, Inc. All rights reserved.</span> <Link class='a'>Terms and condition</Link> <Link class='a'>privacy</Link>  <span class='socials'><a href=''><YellowFacebook one='#EB5757' two="#A4FFFA" /></a><a href=''><YellowInstagram one='#EB5757' two="#A4FFFA" /></a><a href=''><YellowLinkedIn one='#EB5757' two="#A4FFFA"/></a><a href=''><YellowTweet one='#EB5757' two="#A4FFFA"/></a></span></div>
                <div className='overlay'>
                   
                
                </div>
            </div>
            <div className='rightContainer'>
                    <div class='right_cont'>
                           <Time />
                         {!done &&  <span>
                           <div>
                                <h2>Awaiting Bank Transfer</h2>
                                <p>Please use order number as payment reference</p>
                            </div>
                            <div style={{marginTop:'24px'}}>
                               <label>Order number</label>
                               <input type='number' />
                            </div>
                            <div style={{marginTop:'24px'}}>
                           <label>Bank details</label>
                           <div class='layer'><div class='inner-div'>
                              <label>Account name</label>
                              <p>Inchperfectclothing</p>

                              <label>Account number</label>
                              <p class='aza'>6086610017 <span><Copy /></span></p>
                              <label>Bank</label>
                              <p>FCMB</p>
                           </div></div>
                           </div>
                           </span>}
                            {done && <span>
                               <div>
                                <h2>Awaiting Bank Transfer</h2>
                                <p>Upload a screenshot of the transaction receipt</p>
                            </div>  
                           <div style={{marginTop:'24px'}} onClick={()=>uploadRef.current.click()}>
                              <SelectImage />
                           </div>
                           </span> }
                           
                           <button onClick={()=>setDone(!done)}>Confirm payment</button>
                             
                           <span>or</span>

                           <label>Send screenshots to <a href='mailto:'>support@inchperfect.com</a></label>
                           <input type='file' style={{display:'none'}} ref={uploadRef} />

                      </div>
            </div>
        </div>
    )
}
export default Pay