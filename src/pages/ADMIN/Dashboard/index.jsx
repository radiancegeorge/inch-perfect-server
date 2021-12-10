import React from 'react'
import Logo from '../../../assets/png/logo.png'
import PlusCircle from '../../../assets/svg/PlusCircle'
import ViewEye from '../../../assets/svg/ViewEye'
import './index.scss'
import {Link} from 'react-router-dom'


export default function DashBoard() {
    return (
        <div class='dashBoard'>
           <div class='head'><img src={Logo} alt='logo'/></div>
           <div class='body'>
               <Link to='/admin/products'> <div class='div'> <div class='white-div'><ViewEye /><span>View product</span></div> </div></Link>
               <Link to='/admin/addproduct'> <div class='div'> <div class='white-div'><PlusCircle /><span>Add product</span></div> </div></Link>

           </div>
            
        </div>
    )
}
