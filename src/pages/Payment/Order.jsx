import React from 'react'
import axios from 'axios'
import {test} from '../../config/config.json'

export default function Order() {
  const url = test;
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
                console.log(data,status)
               


        } catch (error) {
            
            console.log(error.response.data.error)
                

                // setLoginObject(false)

        }     
    }
    return {
          TakeOrder
    }
        
}
