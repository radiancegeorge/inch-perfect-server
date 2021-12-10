import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import CartItem from './cartItem'
import './index.scss'
import {Link} from 'react-router-dom'
const Cart = ({setOverlay, overlay}) =>{

    const [totalPrice, setTotalPrice] = useState(0)
    const cart = useSelector(state => state.cart);
    useEffect(()=>{
    }, [cart, cart])


    // console.log(cart);
    useEffect(()=>{
       const  prices=cart.filter(items=>
            {return items.selected=== true}
         ).map(items=>{return items.totalPrice})
         console.log(prices);
         let sum=0;
        for (let index = 0; index < prices.length; index++) {
              sum+=prices[index];
              setTotalPrice(sum)
        } 
        console.log(prices);
         
         },[cart])

         const checkoutButton =useRef(null)
         const checkout=()=>{
             if(totalPrice>0)checkoutButton.current.click()
         }
    return(
            <div className="overlay">
                <div className="cartDiv">
                    <div className="cancel" onClick={()=> setOverlay(false)}>
                        X
                    </div>
                    <div className="cart">
                        
                        <div class='head'>
                        <h4>
                            Cart
                        </h4>
                        <div class='select_all'>
                             <label for='select'>select all</label>
                             <input id='select' type='checkbox' />
                        </div>
                        </div>
                        <div className="cartBag">
                            {cart && cart.map((cartItem)=>{
                                
                                const image = JSON.parse(cartItem.product_image)[0]
                                return <CartItem image={image}  cartItem={cartItem} />
                            })}
                        </div>
                        <div className="checkoutDiv">
                            <div className="checkout">
                                <p>
                                    {cart.length} item selected
                                </p>
                                <p className="price">
                                    ${totalPrice}
                                </p>
                                <div onClick={()=>{
                                   setOverlay(false)
                                    checkout()}} className="checkoutButton">
                                    Checkout
                                    <Link style={{display:'none'}} ref={checkoutButton} to='/checkout'></Link>
                                </div>
                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default Cart