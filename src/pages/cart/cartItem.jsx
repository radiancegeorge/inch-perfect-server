import {useEffect, useState,Fragment,useRef } from "react"
import Subtract from '../../assets/svg/Subtract'
import Increase from '../../assets/svg/Increase'
import Remove from '../../assets/svg/Remove'
import Check from '../../assets/svg/Check'

import { useSelector ,useDispatch } from "react-redux"
import {updateCartProperties, removeFromCart} from '../../appStore/cart/index.actions'


const CartItem = ({cartItem, image}) => {

    const dispatch=useDispatch();
    const cart = useSelector(state => state.cart);



     useEffect(()=>{
           }, [cart, cart])


    const [count, setCount] = useState(1)
    const [total,setTotal]=useState()


    useEffect(()=>{
        setTotal(cartItem.price_usd*count)
         cartItem.unit=count;
         cartItem.totalPrice=cartItem.unit*cartItem.price_usd
    
    },[count])
      const [checked,setChecked]=useState('checked')
     
     useEffect(()=>{
         if(checked==='checked'){
             cartItem.selected=true
             dispatch(updateCartProperties(cartItem))
         }
         else {cartItem.selected=false
             dispatch(updateCartProperties(cartItem))
             console.log(cartItem)
         }
     },[checked])

    const checkbox=useRef(null)
    const [display,setDisplay]=useState('flex')

    const click=()=>{
        checkbox.current.click()
        display==='none'?setDisplay('flex'):setDisplay('none')
    }

     


    return(
        <Fragment>
        <div className='cartProduct'>
            <div class='top'>
            <div onClick={click} class='checkbox'><Check display={display} /></div>
             <input ref={checkbox} type='checkbox' style={{display:'none'}} checked={checked} onChange={(e)=>{
                    checked==='checked'?setChecked(''):setChecked('checked')
             }} />
             <div onClick={()=>{
                 dispatch(removeFromCart(cartItem.id))
                 }
                 }><Remove/></div>
            </div>
            <img src={image} alt="" />
            <div className="details">
                <p>
                    {cartItem.product_detail}
                </p>
                <div className="priceAdd">
                    <span className='price'>
                        ${total}
                    </span>
                    <div class='changer'>
                        <span onClick={()=>{
                            count>1 && setCount(count -1)
                            dispatch(updateCartProperties(cartItem))
                        }}><Subtract /></span>
                        <span className='units'>{count}</span>
                        <span onClick={()=>{
                            count<5 && setCount(count +1)
                            console.log(cartItem);
                            dispatch(updateCartProperties(cartItem))
                        }}><Increase /></span>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}
export default CartItem