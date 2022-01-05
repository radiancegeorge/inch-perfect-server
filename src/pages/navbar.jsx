import { useState,useRef,useEffect } from "react"
import Logo from "../assets/svg/logo"
import Bag from '../assets/svg/bag'
import Search from "../assets/svg/search"
import Sun from "../assets/svg/sun"
import {Link} from 'react-router-dom'
import Moon from '../assets/svg/moon'
import './navbar.scss'
import User from "../assets/svg/user"
import CartDot from "../assets/svg/cartDot"
import useGetProducts from '../hooks/getProducts'

const NavBar = ({handleSetOverlay ,search ,nav ,display} ) => {
    const linkRef=useRef(null)
    const authRef=useRef(null)
    const [theme, setTheme] = useState(true)
    const html= document.getElementsByTagName('html')
     useEffect(()=>{
         theme?html[0].setAttribute('theme','light'):html[0].setAttribute('theme','dark')
     },[theme])

     const {searchProducts,products} =useGetProducts()
    
    return(
        <div className={`navbar ${nav}`}>
            <div className='navbarLeft'>
                <Link to='/' className="img">
                    <Logo />
                </Link>
                <div className='search'>
                    <div onClick={()=>search()}>
                        <input type="text" onChange={(e)=>searchProducts(e.target.value)}  placeholder='Search..'/>
                        <Search />
                    </div>
                </div>
                <div className='colorSection'>
                    <div onClick ={()=> setTheme(!theme)} className="colorMode">
                        <div onClick={()=> setTheme(!theme)} className={`light ${!theme && 'dark'} lightDark`}>
                            {
                                theme?<Sun />:<Moon />
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="navbarRight">
                <div onClick={()=>handleSetOverlay()} style={{display:`${display}`}} className='svg'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.799 1.8335C13.1951 1.8335 15.1744 3.65918 15.4185 5.99417L15.4866 5.99498C16.8157 5.99498 18.4318 6.87773 18.9772 9.35365L19.7005 14.9517C19.9599 16.7585 19.6354 18.2077 18.7343 19.2472C17.8378 20.2812 16.4188 20.8285 14.6304 20.8285H6.97807C5.01366 20.8285 3.64507 20.3472 2.79349 19.3581C1.93824 18.3663 1.65224 16.8786 1.94374 14.9371L2.65507 9.41323C3.12257 6.88048 4.83216 5.99498 6.15582 5.99498C6.27009 4.94125 6.74523 3.93881 7.49901 3.18741C8.36526 2.32666 9.55968 1.8335 10.7798 1.8335H10.799ZM15.4866 7.36998H6.15582C5.75157 7.36998 4.40041 7.53315 4.01266 9.62681L3.30499 15.1268C3.07491 16.6696 3.25274 17.7861 3.83482 18.4616C4.40957 19.129 5.43807 19.4535 6.97807 19.4535H14.6304C15.5911 19.4535 16.9028 19.2619 17.6948 18.3471C18.3237 17.622 18.54 16.5421 18.3383 15.1369L17.6242 9.58923C17.3199 8.22248 16.5169 7.36998 15.4866 7.36998ZM13.4725 9.92207C13.852 9.92207 14.1811 10.2301 14.1811 10.6096C14.1811 10.9891 13.8941 11.2971 13.5146 11.2971H13.4725C13.093 11.2971 12.785 10.9891 12.785 10.6096C12.785 10.2301 13.093 9.92207 13.4725 9.92207ZM8.12821 9.92207C8.50771 9.92207 8.8368 10.2301 8.8368 10.6096C8.8368 10.9891 8.54896 11.2971 8.16946 11.2971H8.12821C7.74871 11.2971 7.44071 10.9891 7.44071 10.6096C7.44071 10.2301 7.74871 9.92207 8.12821 9.92207ZM10.7963 3.2085H10.7825C9.91993 3.2085 9.07935 3.55591 8.46976 4.16183C7.97321 4.65616 7.64845 5.30601 7.54339 5.99455L14.0327 5.99481C13.7972 4.41976 12.4352 3.2085 10.7963 3.2085Z" fill="white"/>
                        <CartDot />
                    </svg>
                </div>
                <div onClick={()=>localStorage.getItem('inchToken')?linkRef.current.click():authRef.current.click()}>
                   <User width={18}/>
                   <Link ref={linkRef} style={{display:'none'}} to='/profile'></Link>
                   <Link ref={authRef} style={{display:'none'}} to='/auth'></Link>

                </div>
            </div>
        </div>
    )
}
export default NavBar