import React from 'react'
import { useEffect, useState,  } from "react"
import './payment.scss' 
import { useSelector } from "react-redux"
import BriefCase from '../../assets/svg/BriefCase'
import America from '../../assets/svg/America'
import Nigeria from '../../assets/svg/Nigeria'
import {Link} from 'react-router-dom'
import Card from '../../assets/svg/Card'
import Good from '../../assets/svg/Good'
import PaystackPop from "@paystack/inline-js";
import Order from './Order'
import DeliveryDetails from '../Profile/DeliveryDetails'
import House from '../../assets/png/pana.png'



export default function Payment() {

    //   const key ='pk_test_ec128fa38ab84805f73c5f3f91086b03c2dbca97'
     const testkey = "pk_test_ec128fa38ab84805f73c5f3f91086b03c2dbca97";
   const mail =localStorage.getItem('email')
  const paystack = new PaystackPop();
    const {TakeOrder}=Order()
    
    const [currency,setCurrency]=useState('USD')
    const[priceUsd,setPriceUsd]=useState(0)
     const [priceNgn,setPriceNgn]=useState(0)
   const [cost,setCost]=useState(priceUsd)
  const initiateTransaction = () => {
     if(cost>0){
    paystack.newTransaction({
      amount: cost*100,
      email: mail,
      key: testkey,
      currency:currency,
      name: localStorage.getItem('first_name'),
      onCancel: () => window.alert("oh, dear u canceled"),
      onSuccess:  (e) => {
        //   setOrder({...order,reference:e.reference})
       TakeOrder(items,'automatic',e.reference,currency)
            paidRef.current.click()
             console.log(e.reference)
        
      },
    });
}
  };
 const payRef=React.useRef(null)
 const paidRef=React.useRef(null)

  const manualOrder=()=>{
      payRef.current.click()
      TakeOrder(items,'MANUAL','',currency)}
    useEffect(()=>{
        currency==='USD'?setCost(priceUsd):setCost(priceNgn)
    },[currency])
    const cart = useSelector(state => state.cart);
    useEffect(()=>{
    }, [cart, cart])


    const [order,setOrder]=useState({})
    const [items,setItems]=useState([{}])
     console.log(order);
       useEffect(()=>{
           const selected=cart.filter(item=>{return item.selected===true})
           const orders = selected.map(item=>{
               return {
                   product_name:item.product_name,
                   id:item.id,
                   unit:item.unit,
                   price_ngn:item.price_ngn,
                   price_usd:item.price_usd
               }
           })
           setItems(selected)
           setOrder(orders)

           const unit=selected.map(item=>{return item.unit})
           const prices=selected.map(item=>{return item.price_ngn})
           console.log(unit,prices);
           let sum=0;
           let ngnSum=0;
        for (let index = 0; index < selected.length; index++) {
              sum+=selected[index].totalPrice;
              ngnSum+=unit[index]*prices[index]
              setPriceUsd(sum)
              setPriceNgn(ngnSum)
        } 
       },[cart])
       const [newDet,setNew]=useState(false)
       const [display,setDisplay]=useState('')
       const [location,setLocation]=useState(false)
       useEffect(()=>{
           localStorage.getItem('country')?setLocation(true):setLocation(false)
       })
       const [detNone,setDetNone]=React.useState('')
      const [payNone,setPayNone]=React.useState('none')
      const [nextNone,setNextNone]=React.useState('')

       const [transactionType,setTransactionType]=React.useState(1)
      return (
        <div class='payment'>
            <div class='payment_details'>
                 <div class='heading'>
                   <div class='fat_block'></div>
                   <h2>Payment details</h2>
                   <div class='long_block'></div>

                </div>
                <div class='body'>
                  {location &&<div class={`address ${detNone}`}>
                         <div style={{display:display}} class='heading'>
                             <span class='d_a'>Delivery Address</span>
                             <span class='a_d_a' onClick={()=>{
                                 setDisplay('none')
                                 setNew(true)
                                 setNextNone('none')}
                             }> Add delivery address</span>
                        </div>
          
                        <DeliveryDetails new={newDet} />
                        <button class={`next-button ${nextNone}`} onClick={()=>{
                            setDetNone('none')
                            setPayNone('')
                        }}>Next</button>
                    </div>
                    }
                    {
                        !location && <div class='address'>
                           <div style={{display:display}} class='heading'>
                             <span class='d_a'>Delivery Address</span>
                        </div>
                        <div class='empty'>

                        <img src={House} alt=''/>
                               <p>You have no address setup
                               Tap the button below to add one</p>
                              <button onClick={()=>{
                                  setLocation(!location)
                                  setNew(true)
                              }}>Add new billing address</button> 
                        </div>
                        </div>
                    }



                    <div class={`payment_option ${payNone}`}>
                        <p>Chose Payment method</p>
                        <div><span onClick={()=>setTransactionType(2)}><BriefCase /> Bank</span> <span onClick={()=>setTransactionType(1)} ><Card /> Card</span></div>
                        <p>Chose currency</p>
                        <div><span onClick={()=>setCurrency('NGN')}><Nigeria /> NGN</span> <span onClick={()=>setCurrency('USD')} ><America /> USD</span></div>
                       <div style={{flexDirection:'column'}}>
                        <p>Coupon code</p>
                        <div class='coupon'><input /><Good /></div></div>
                        <div class='t_c'>
                          <div><input type='checkbox' /></div>
                          <span>I have read and agree to inch perfect’s
                          <Link> Terms and conditions</Link></span>
                        </div>
                        <button onClick={()=>transactionType===1?initiateTransaction():manualOrder()}>Pay now</button>
                        <Link style={{display:'none'}} ref={payRef} to='/checkout/pay'/>
                        <Link style={{display:'none'}} ref={paidRef} to='/checkout/paid'/>

                    </div>                
                </div>
            </div>
           <div class='selected_items'>
              <p>You’re about to purchase these items</p>
              <div class='items'>{
                        items && items.map(item=>{
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
                                        {/* {
                                            !cart.includes(data) && <div onClick={()=>{
                                                dispatch(addToCart(data))
                                                // console.log(image[0]);
                                            }} className="addProduct">
                                                <Add />
                                            </div>
                                        } */}
                                    </div>
                                </div>
                            </div>
                        })
                           }</div>
            </div> 
        
        </div>
    )
}
