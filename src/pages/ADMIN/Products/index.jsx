import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/png/logo.png'
import Search from '../../../assets/svg/search'
// import '../../pages/products/index.scss'



export default function ViewProducts({children}) {



    return (
        <div class='appContainer'>
         <div class='navbar'>
            <div className='navbarLeft'>
                <Link to='/admin/dashboard' className="img">
                    <img src={Logo} alt='' />
                </Link>
                <div className='search'>
                    <div >
                        <input type="text"  placeholder='Search..'/>
                        <Search />
                    </div>
                </div>
               
            </div>
         </div>
         {children}
        </div>
    )
}
