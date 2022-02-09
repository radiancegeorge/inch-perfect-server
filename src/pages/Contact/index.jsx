import { Link } from "react-router-dom";
import Logo from "../../assets/svg/logo";
import Leftbg from '../../assets/png/leftbg.png'
import Footer from "../Landing/footer";
import Bottombg from '../../assets/png/bottombg.png'
import '../Landing/index.scss'
import './index.scss'


export default function Contact(){
    return(
        <div className="landing contact">
        <div className="top">
            <div className="left">
            <div className="overlay"></div>
            <div style={{height:'100%'}}><img src={Leftbg} alt="" /></div>
              
            </div>
            <div className="main">
                <div className="nav_side">
                    <Logo/>
                <Link to='/'  className='blur'>HOME </Link> 
                <div className='homeLink'> <Link to='/contact-us' >CONTACT US</Link><div class='span'>
                </div></div>
                
                </div>
                <div className="write_up" >
                  <div className="left">
                      <div className="contacts">
                          <div className="number">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                 <g opacity="0.3">
                                 <path d="M21.9994 16.9201V19.9201C22.0006 20.1986 21.9435 20.4743 21.832 20.7294C21.7204 20.9846 21.5567 21.2137 21.3515 21.402C21.1463 21.5902 20.904 21.7336 20.6402 21.8228C20.3764 21.912 20.0968 21.9452 19.8194 21.9201C16.7423 21.5857 13.7864 20.5342 11.1894 18.8501C8.77327 17.3148 6.72478 15.2663 5.18945 12.8501C3.49942 10.2413 2.44769 7.27109 2.11944 4.1801C2.09446 3.90356 2.12732 3.62486 2.21595 3.36172C2.30457 3.09859 2.44702 2.85679 2.63421 2.65172C2.82141 2.44665 3.04925 2.28281 3.30324 2.17062C3.55722 2.05843 3.83179 2.00036 4.10945 2.0001H7.10945C7.59475 1.99532 8.06524 2.16718 8.43321 2.48363C8.80118 2.80008 9.04152 3.23954 9.10944 3.7201C9.23607 4.68016 9.47089 5.62282 9.80945 6.5301C9.94399 6.88802 9.97311 7.27701 9.89335 7.65098C9.8136 8.02494 9.62831 8.36821 9.35944 8.6401L8.08945 9.9101C9.513 12.4136 11.5859 14.4865 14.0894 15.9101L15.3594 14.6401C15.6313 14.3712 15.9746 14.1859 16.3486 14.1062C16.7225 14.0264 17.1115 14.0556 17.4694 14.1901C18.3767 14.5286 19.3194 14.7635 20.2794 14.8901C20.7652 14.9586 21.2088 15.2033 21.526 15.5776C21.8431 15.9519 22.0116 16.4297 21.9994 16.9201Z" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                                   </g>
                          </svg>   <a href="tel:0812 345 6789">0812 345 6789</a> 
                          </div>
                          <hr />
                          <div className="mail">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                              <a href="mailto:admin@inchperfectstores.com">Admin@inchperfectstores.com</a>
                          </div>
                      </div>
                        <div className="socials">
                  <a href="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  </a>
                  <a href="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M23 2.9998C22.0424 3.67528 20.9821 4.19191 19.86 4.5298C19.2577 3.83731 18.4573 3.34649 17.567 3.12373C16.6767 2.90096 15.7395 2.957 14.8821 3.28426C14.0247 3.61151 13.2884 4.1942 12.773 4.95352C12.2575 5.71283 11.9877 6.61214 12 7.5298V8.5298C10.2426 8.57537 8.50127 8.18561 6.93101 7.39525C5.36074 6.60488 4.01032 5.43844 3 3.9998C3 3.9998 -1 12.9998 8 16.9998C5.94053 18.3978 3.48716 19.0987 1 18.9998C10 23.9998 21 18.9998 21 7.4998C20.9991 7.22126 20.9723 6.9434 20.92 6.6698C21.9406 5.6633 22.6608 4.39251 23 2.9998V2.9998Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  </a>
                  <a href="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.9997 11.3703C16.1231 12.2025 15.981 13.0525 15.5935 13.7993C15.206 14.5461 14.5929 15.1517 13.8413 15.53C13.0898 15.9082 12.2382 16.0399 11.4075 15.9062C10.5768 15.7726 9.80947 15.3804 9.21455 14.7855C8.61962 14.1905 8.22744 13.4232 8.09377 12.5925C7.96011 11.7619 8.09177 10.9102 8.47003 10.1587C8.84829 9.40716 9.45389 8.79404 10.2007 8.40654C10.9475 8.01904 11.7975 7.87689 12.6297 8.0003C13.4786 8.12619 14.2646 8.52176 14.8714 9.12861C15.4782 9.73545 15.8738 10.5214 15.9997 11.3703Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5 6.5H17.51" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                  </a>
                  <a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                  </a>
              </div>

                  </div>

                  <svg style={{margin:'0 16px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="158" viewBox="0 0 16 158" fill="none">
<line opacity="0.3" x1="7.5" y1="158" x2="7.5" y2="110" stroke="white"/>
<line opacity="0.3" x1="7.5" y1="48" x2="7.5" stroke="white"/>
<path d="M2.86 82.45C2.86 84.41 4.45 86 6.41 86C8.37 86 9.96 84.41 9.96 82.45C9.96 80.5 8.37 78.91 6.41 78.91C4.45 78.91 2.86 80.5 2.86 82.45ZM9.23 82.45C9.23 84 7.96 85.26 6.41 85.26C4.86 85.26 3.6 84 3.6 82.45C3.6 80.9 4.86 79.64 6.41 79.64C7.96 79.64 9.23 80.9 9.23 82.45ZM6.8 74.8794C6.8 73.7994 5.91 72.9194 4.82 72.9194C3.74 72.9194 2.85 73.7994 2.85 74.8794L2.85 77.7094H10V76.9594H6.97L10 73.5594V72.4494L6.8 76.0594V74.8794ZM3.6 76.9594L3.6 74.8794C3.6 74.2094 4.15 73.6594 4.82 73.6594C5.5 73.6594 6.05 74.2094 6.05 74.8794V76.9594H3.6Z" fill="white"/>
</svg>
                  <div className="right">
                      <h2>
                          send us a message
                      </h2>
                      <form action="">
                          <input type="text" placeholder="Name" />
                          <input type="text" placeholder="Email" />
                          <input type="text" placeholder="Message" />
                          <button>Send message</button>
                      </form>
                  </div>
                </div>
                
            </div>
        </div>
         <div className="about">   
             <Footer />
             </div>
        </div>
    
    )
}