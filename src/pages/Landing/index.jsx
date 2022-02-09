import Leftbg from '../../assets/png/leftbg.png'
import Bottombg from '../../assets/png/bottombg.png'
import './index.scss'
import Logo from '../../assets/svg/logo'
import { Link } from 'react-router-dom'
import Image from '../../assets/png/containerImage.png'
import {test} from '../../config/config.json'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Category from './Category'
import logo from './Images/AboutLogo.png'
import LeftPhones from './Images/leftPhones.png'
import RightPhones from "./Images/rightPhones.png";
import ios from './Images/ios.png'
import Happy from './Images/happy.png'
import Cats from './Images/cats.png'
import Footer from './footer'



export default function Landing(){
    const url=test;
    const [products,setProducts]=useState([])
    useEffect(()=>{
        axios.get(`${url}products`).then(response=>{return response.data}).then(response=>{
        console.log(response.data);
     
        response.data && setProducts(response.data)
        })
        },[url]) 
    
  
    return(
        <div className="landing">
            <div className="top">
                <div className="left">
                <div className="overlay"></div>
                <div style={{height:'100%'}}><img src={Leftbg} alt="" /></div>
                  
                </div>
                <div className="main">
                    <div className="nav_side">
                        <Logo/>
                    <div className='homeLink'><Link to='/'>HOME </Link> <div class='span'></div>
                    </div>
                    <Link to='/contact-us' className='blur'>CONTACT US</Link>
                    
                    </div>
                    <div className="write_up">
                        <h1>The <span>classy</span> woman’s store</h1>
                        <p>
                        Vestibulum, sagittis, maecenas ipsum fringilla arcu. Sem eu et velit, ullamcorper odio ullamcorper sagittis felis pharetra. Scelerisque pulvinar dolor arcu massa eget a.
                        </p>
                    </div>
                    <div className="bottom_Img">
                        <img src={Bottombg} alt=''/>
                    </div>
                </div>
            </div>
            <div className="about">
                <div className="top">
                    <div className="arts">
                        <div className="img"> <div className="overlay"></div><img src={Image} alt='' /></div>
                        <div className="img" style={{marginTop:'18px',background:'rgba(13,13,13,0.7)'}}><div className="overlay"></div><img src={Image} alt='' /></div>
                        <div className="img"><div className="overlay"></div><img src={Image} alt='' /></div>
                    </div>
                    <h1>best  <span>quality </span>
                        more <span>affordable</span>
                    </h1>
                    <p>
                    Sit in habitasse viverra adipiscing. Tempus, leo at duis a morbi sed tellus libero. Sapien gravida bibendum neque vitae donec. Fermentum lobortis sed.
                    </p>
                </div>

                <div className="get_started">
                    <div className="categories">
                        <h2 className="h2">Categories</h2>
                        <p>
                        Go through our beautiful collection for a classy look
                        </p>
                        <button onClick={()=>{
                            window.location.replace('/products')
                        }}>
                            Take me there
                        </button>
                    </div>
                    <div className="pictures">
                        {products.map(cat=>(
                            <Category data={cat} />
                        ))}
                    </div>
                </div>
                <div className="about_us">
                    <div className="logo">
                        <img src={logo} alt=''/>
                    </div>
                    <div className="write_up">
                      <h1>About us</h1>
                      <p>Inch perfect is a contemporary, African inspired, Best-spoke and ready to wear brand. </p>
                      <p>Rooted in providing well made pieces that speak style, comfort, elegance, confidence and a play on balance between modest outfits and modern fashion.</p>
                      <p> The idea Inch Woman is classy.</p>
                    </div>
                </div>
                <div className="this_store">
                    <div class='write_up'>
                       <h1>This store</h1>
                       <p><span>Are you looking for your next fit?</span> 
                          We provide digital access to all our collections.</p>

                        <button>Take me there</button>
                    </div>
                    <div className="images">
                        <img src={LeftPhones} alt='' />
                        <img src={RightPhones} alt='' />
                    </div>
                </div>
                <div className="numbers">
                    <img src={Cats} alt="" />
                    <img src={Happy} alt="" />
                    <img src={ios} alt="" />
                </div>
                 <Footer />
            </div>
        </div>
    )
}