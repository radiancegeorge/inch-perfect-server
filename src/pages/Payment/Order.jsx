import React from 'react'
import axios from 'axios'
import {test} from '../../config/config.json'
import {removeFromCart} from '../../appStore/cart/index.actions'
import {useDispatch ,useSelector} from 'react-redux'




export default function Order() {
  const url = test;
  const dispatch=useDispatch();
  const cart = useSelector(state => state.cart);

  const onlySelected=()=>{
        cart.filter(items=>{return items.selected===false}).map(items=>dispatch(removeFromCart(items.id)))
  }


     const TakeOrder=async (product,method,reference,currency)=>{
        // setLoginObject(true)
         try {
            const { status, data }= await axios.post(`${url}orders/create_order`, JSON.stringify({
                product:product,
                method:method,
                referrence:reference,
                currency:currency
            }), {
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem("inchToken")}`,
                    "content-type": "application/json"
                }
            });
                localStorage.setItem('orderId',data.id)
                console.log(data,status)
                onlySelected()


        } catch (error) {
            
            console.log(error.response.data.error)
                

                // setLoginObject(false)

        }     
    }
    return {
          TakeOrder
    }
        
}
