import { useEffect, useState,  } from "react"
import { useSelector } from "react-redux"
import CartItem from './cartItem'
const Cart = ({setOverlay, overlay}) =>{
    const [totalPrice, setTotalPrice] = useState(0)
    const cart = useSelector(state => state.cart);
    useEffect(()=>{
    }, [cart, cart])
    return(
            <div className="overlay">
                <div className="cartDiv">
                    <div className="cancel" onClick={()=> setOverlay(false)}>
                        X
                    </div>
                    <div className="cart">
                        <h4>
                            Cart
                        </h4>
                        <div className="cartBag">
                            {cart && cart.map((cartItem)=>{
                                const image = JSON.parse(cartItem.product_image)[0]
                                return <CartItem countCount={countCount} cartItem={cartItem} image ={image}/>
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
                                <div className="checkoutButton">
                                    Checkout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default Cart