import React from 'react'
import './profile.scss'
import Open from '../../assets/svg/Open'
import Nigeria from '../../assets/svg/Nigeria'
import America from '../../assets/svg/America'
import LogOut from '../../assets/svg/LogOut'
import DeliveryDetails from './DeliveryDetails'
import PersonalDetails from './PersonalDetails'
import {Link} from 'react-router-dom'


export default function Profile() {
    const [content,setContent]=React.useState(<PersonalDetails />)
    const [focusName,setFocusName]=React.useState('')
    const [personal,setPersonal]=React.useState(false)
    const [delivery,setDelivery]=React.useState(false)
   const focus=(e)=>{
        setFocusName(e.target.id)
        if(e.target.id==='personal')setPersonal(!personal)
        if(e.target.id==='delivery')setDelivery(!delivery)
        const Links=document.querySelectorAll('.nav-link')
        Links.forEach(link=>{
            if(link===e.target){
                   link.classList.add('focused-nav')
            }
            else{
                link.classList.remove('focused-nav')
            }

            
        })
   }
   React.useEffect(()=>{
       if(focusName==='personal'){
           setContent(<PersonalDetails />)
        
       }
        if(focusName==='delivery'){
           setContent(<DeliveryDetails />)
       }
   },[focusName])
   const linkRef=React.useRef(null)
   const logout=()=>{
         linkRef.current.click()
   }

    return (
        <div class='profile'>
            <div class='profileNav'>
                <div class='welcome'>
                   <span class='greeting'>Welcome back</span>
                   <span class='name'>@{localStorage.getItem('first_name')}</span>   
                </div>

                <div class='line'></div>
                <div class='nav-link-container'>
                <div id='personal' class='nav-link' onClick={focus} >Personal details <span><Open /></span></div>
                {personal &&<div class='personal_content'> <PersonalDetails /></div>}
                <div class='nav-link'onClick={focus}>Order History <span><Open /></span></div>
                <div id='delivery' class='nav-link'onClick={focus}>Delivery address <span><Open /></span></div>
                {delivery && <div class='personal_content'><DeliveryDetails /></div>}
                </div>
                <div class='line'></div>
                <div class='currency'>
                  <p>Currency</p>
                  <div class='country'>
                  <div class='flag'><Nigeria /> NGN</div>
                  <div class='flag'><America /> USD</div>
                  </div>
                
                </div>
                <div class='log_out' onClick={logout}>Logout <LogOut /></div>
                <Link to='/auth' ref={linkRef}/>
            </div>
            <div class='content'>
                {content}
            </div>
        </div>
    )
}
