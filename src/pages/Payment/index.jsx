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
import Products from '../products'



export default function Payment() {

    //   const key ='pk_test_ec128fa38ab84805f73c5f3f91086b03c2dbca97'
     const testkey = "pk_live_75358a68596ef15871f956613902a268b46deaf8";
   const mail =localStorage.getItem('email')
  const paystack = new PaystackPop();
    const {TakeOrder}=Order()
    const [fee,setFee]=useState(0)
    const state=localStorage.getItem('state')
    const town =localStorage.getItem('town')
    const country=localStorage.getItem('country')
    const [currency,setCurrency]=useState('USD')
    const[priceUsd,setPriceUsd]=useState(0)
     const [priceNgn,setPriceNgn]=useState(0)

    const lagos=/lagos/i
    const region =/island|lekki|vgc|ajah|ikoyi|bannana/i
    const nigeria=/nigeria/i
    const USA=/usa|canada|uk/i
    // console.log(lagos.test('Lagos'))
   useEffect(()=>{
       if(nigeria.test(country)){
          if(lagos.test(state)){
              if(region.test(town)){
               setFee(2500)
           }
           else{
           setFee(2000)
           }
       }
       else{
           setFee(3500)
       }
       }
       else if(USA.test(country)){
            setCurrency('USD')
            if(order.length<4){
                setFee(50)
            }
            if(order.length>3 && order.length<7){
                setFee(100)
            }
       }
       else{
           setCurrency('USD')
            if(order.length<4){
                setFee(60)
            }
            if(order.length>3 && order.length<7){
                setFee(110)
            }
       }
   },[country])




   const [cost,setCost]=useState(priceUsd )



  const initiateTransaction = () => {
     if(cost>0){
    paystack.newTransaction({
      amount: (cost+ fee)*100,
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
     if(cost>0) {payRef.current.click()}
      TakeOrder(items,'MANUAL','',currency)}
    useEffect(()=>{
        currency==='USD'?setCost(priceUsd):setCost(priceNgn)
    },[currency])
    const cart = useSelector(state => state.cart);
    useEffect(()=>{
    }, [cart, cart])


    const [order,setOrder]=useState({})
    const [items,setItems]=useState([{}])
    
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
       let getCountry= localStorage.getItem('country')
       const [location,setLocation]=useState(false)
       useEffect(()=>{
           getCountry!=='null'?setLocation(true):setLocation(false)
       },[getCountry]) 
       const [detNone,setDetNone]=React.useState('')
      const [payNone,setPayNone]=React.useState('none')
      const [nextNone,setNextNone]=React.useState('')
      const [agree,setAgree]=React.useState(false)
       const [transactionType,setTransactionType]=React.useState(1)
      console.log(getCountry==='null');
      const homeRef=React.useRef(null) 
    const flags = document.querySelectorAll('.flag')
    const transType =document.querySelectorAll('.platform')
      const select=(e,selector) => {
        selector.forEach(currency => {   
            if (e === currency) {
                currency.classList.add('focused-flag')
                console.log(currency.classList)
            }
            else currency.classList.remove('focused-flag')

        })
        }

      return (
        <Products >
            <div class='payment'>
            <div class='payment_details'>
                 <div class='heading'>
                 <Link ref={homeRef} style={{display:'none'}} to='/'></Link>
                   <div class='fat_block'></div>
                   <h2 onClick={()=>homeRef.current.click()}>Payment details</h2>
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

                        <div class='total'><span>Total:</span>{currency==='USD'?`$${cost + fee}`:`N${cost + fee}`}</div>

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
                        <p> Chose Payment method</p>
                              <div><span class='platform' onClick={(e) => {setTransactionType(2)
                                  select(e.target, transType)  
                            }}><BriefCase /> Bank</span> <span class='platform' onClick={(e)=>{setTransactionType(1)
                               select(e.target,transType)
                            }} ><Card /> Card</span></div>
                        <p>Chose currency</p>
                        <div><span class='flag' onClick={(e)=>{setCurrency('NGN')
                                                          select(e.target,flags)
                              }}><Nigeria /> NGN</span> <span class='flag' onClick={(e) => {
                                  setCurrency('USD')
                                  select(e.target,flags)
                              }} ><America /> USD</span></div>
                       <div style={{flexDirection:'column'}}>
                        <p>Coupon code</p>
                        <div class='coupon'><input /><Good /></div></div>
                        <div class='t_c'>
                          <div><input type='checkbox' onChange={(e)=>e.target.checked?setAgree(true):setAgree(false)} /></div>
                          <span>I have read and agree to inch perfect’s
                          <Link> Terms and conditions</Link></span>
                        </div>
                        <button onClick={()=>{
                             if(agree)
                            {transactionType===1?initiateTransaction():manualOrder()}}}>Pay now</button>
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
            </Products>
    )
}
