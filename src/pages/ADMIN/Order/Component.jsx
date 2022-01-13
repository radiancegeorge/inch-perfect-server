import axios from "axios";
import { Fragment,useState } from "react";
import {test} from '../../../config/config.json'

export default function Component({data}) {
     const [details,setShowDetails]=useState(false)
     const url=test;
    const headers={
            "Authorization":`Bearer ${window.localStorage.getItem("inchToken")}`,
            "content-type": "application/json"
    }
      const setDelivered=()=>{
          axios.patch(`${url}orders/order_status?delivered=${data.id}`,{headers:headers}).then(response=>{
              window.location.reload()
              console.log(response)})
      }
    return(
        <Fragment>
           <div className="order_item" onClick={()=>setShowDetails(true)}>
               <div className="order_id">{data.id}</div>
               <div className="name">{`${data.first_name} ${data.last_name}`}</div>
               <div className="amount">{`${data.currency} ${data.total}`}</div>
           </div>

          {details && <div class='full_order' onClick={()=>setShowDetails(false)}>
              <div class='order_content'onClick={(e)=>e.stopPropagation()}>
                  <div className="top">
                      <label>Order Id: <div className="order_id">{data.id}</div></label>
                      <label>Customer's Name:<div className="name">{`${data.first_name} ${data.last_name}`}</div></label>       
                      <label>Total:<div className="amount">{`${data.currency} ${data.total}`}</div></label>
                      <label>Payment status:<div>{data.method==='AUTOMATIC'?'PAID':'Check mail'}</div></label>
                      <label>Location:<div>{`${data.street},${data.town},${data.state},${data.country}`}</div></label>
                      <label>Processing status:<div>{data.delivered==='1'?'In Progress':'Processed'}</div></label> 

                  </div>
                  <hr />
                  <div class='ordered_products'>
                      {data?.product.map(product=>(
                          <div class='product_item'>
                           <span>Product id:{product.id}</span>
                              <span>Unit ordered:{product.unit}</span>
                            
                            
                              
                           </div>
                      ))}
                  </div>
                  <div class='delivery_status'>
               {data.delivered==='1'&& <span onClick={setDelivered} >Delivered?</span>}
                 {data.delivered==='2'&&<span  >Delivered</span>}
           </div>
                 </div>
                 
           </div>}
           
        </Fragment>
    )
    
}
