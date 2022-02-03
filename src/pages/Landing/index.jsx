import Leftbg from '../../assets/png/leftbg.png'
import Bottombg from '../../assets/png/bottombg.png'
import './index.scss'
import Logo from '../../assets/svg/logo'
import { Link } from 'react-router-dom'
import Image from '../../assets/png/containerImage.png'



export default function Landing(){


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
                    <Link to='/contact_us' className='blur'>CONTACT US</Link>
                    
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
                </div>
            </div>
        </div>
    )
}