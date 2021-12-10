import React from 'react'
import Logo from '../../assets/png/logo.png'
import Instagram from '../../assets/svg/Instagram'
import LinkedIn from '../../assets/svg/LinkedIn'
import Tweet from '../../assets/svg/Tweet'
import Success from '../../assets/svg/Success'
import NavBar from '../navbar'
import FaceBook from '../../assets/svg/FaceBook'
import ContainerImage from '../../assets/png/containerImage.png'
import './pay.scss'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import {useSelector} from 'react-redux'



const Paying = () => {
     const homeLink=React.useRef(null) 
     const cart = useSelector(state => state.cart);
     React.useEffect(()=>
     [cart,cart])
     console.log(cart);


    return(
        <div className='containerr'>
        <div class='nav'><NavBar nav='navbar2' display='none' /></div>
            <div className='leftContainer'>
                <img src={ContainerImage} alt="Background" className='leftContainerBackgroundImage'/>
        
                <div class='write'>
                   
                    <div class='thanks'>Thanks for your patronage
                        <span>Your goods are on their way to you</span>
                   </div>

                   <div class='images'>
                       {
                           cart.map(
                               item=>{
                                    // let image=JSON.parse(item.product_image)
                                    const image=item.product_image;
                                    // console.log();
                                 return <div className="product">
                                 <div class='top_details'>{item.unit} {item.unit>1?'peices':'peice'}</div>
                              {image && <img src={JSON.parse(image)[0]} alt="" />}
                                <div className="productDetails">
                                    <div className="productDescription">
                                        {item.product_detail}
                                    </div>
                                    <div className="priceAndAdd">
                                        <span>
                                            ${item.price_usd}
                                        </span>
                                       
                                    </div>
                                </div>
                            </div>
                        }
                           )
                       }
                   </div>
                </div>
                <div class='bottom_socials'><span class='copy_right'>© Inch perfect, Inc. All rights reserved.</span> <Link>Terms and condition</Link> <Link>privacy</Link>  <span class='socials'><a href=''><FaceBook one='#EB5757' two="#A4FFFA" /></a><a href=''><Instagram one='#EB5757' two="#A4FFFA" /></a><a href=''><LinkedIn one='#EB5757' two="#A4FFFA"/></a><a href=''><Tweet one='#EB5757' two="#A4FFFA"/></a></span></div>
                <div className='overlay'>
                   
                
                </div>
            </div>
            <div className='rightContainer'>
                    <div class='right_cont'>
                      <div class='success'>
                         <Success />
                         <h2>Payment Successful</h2>
                         <p>Your payment was completed successfully</p>
                      
                      </div>
                      <div class='buttons'>
                         <button class='contact'> Contact us</button>
                        <button onClick={()=>homeLink.current.click()} class='home'>Go home</button> 
                        <Link style={{display:'none'}}ref={homeLink} to ='/'></Link>                     
                      </div>
                      </div>
            </div>
        </div>
    )
}
export default Paying