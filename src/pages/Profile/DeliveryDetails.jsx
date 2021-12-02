import React from 'react'
import axios from 'axios'
import {test} from '../../config/config.json'
import RoundCheck from '../../assets/svg/RoundCheck'

export default function DeliveryDetails(props) {
    const [countries,setCountries]=React.useState([])
    const [data,setData]=React.useState({})
     const url=test;
 React.useEffect(()=>{
        axios.get("https://restcountries.com/v3.1/all/").then(response=>{ return response.data})
        .then(response=>{
            setCountries(response.map(country=>{
                return country.name.common
            }))
        }
        )
        
        },[])
        React.useEffect(()=>{if(props.new){
          setNewDetails(!newDetails)
        }},[props.new])
    const handleDetails=(e)=>{
               setData({...data,[e.target.name]:e.target.value})
        }
     const [newDetails,setNewDetails]=React.useState(false)
     console.log(localStorage.getItem("inchToken"))
         const update=async (body)=>{
    
         try {
            const { status, data } = await axios.post(`${url}user/update_billing_info`, JSON.stringify(body), {
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem("inchToken")}`,
                    "content-type": "application/json"
                }
            });
                console.log(data)
                setNewDetails(!newDetails)
                localStorage.setItem('first_name',data.first_name)
                localStorage.setItem('last_name',data.last_name)
                localStorage.setItem('inchToken',data.token)

        } catch (error) {
            
            console.log(error.response.data.error)
                // setLoginObject(false)

        }     
    }
      
    return (
        <div class='delivery_details'>
          { !newDetails &&
          <div class='det_cont '>
           <div class='details'>
               <p><span class='round'><RoundCheck /></span>same as billing address</p>
               <div class='det-div'>
               <span>Country / Region:<span> {localStorage.getItem('country')}</span></span>
               <span>State:<span> {localStorage.getItem('state')}</span></span>
               <span>Town / City:<span> {localStorage.getItem('town')}</span></span>
               <span>Zipcode: <span>{localStorage.getItem('code')}</span></span>
               </div>
               <div class='street'>
                        Street Address:  <span>{localStorage.getItem('street')}</span>.
               </div>

            </div>
               <button onClick={()=>setNewDetails(!newDetails)}>Add new delivery address</button>
                        

          </div>
}

           {newDetails && <div class='new_details'>
            <div class='top'>
              <span class='d_a' onClick={()=>setNewDetails(!newDetails)}>Delivery address</span>
              <span>{'>'}</span>
              <span>Add new Address</span>
            </div>
            <p>Add new delivery address</p>
           <div class='billing'>
              <form onSubmit={(e)=>{
                e.preventDefault()
                console.log(data);
                update(data)}}>
                  
                  <div>
                   <span>
                   <label for='select'>Country/Region<span>*</span></label>
                     <select name='country' id='select' onChange={handleDetails}>
                     
                     {countries.map(country=>(
                      <option value={country}>{country}</option>
                        ))}
                        </select>
                   </span>
                   <span>
                    <label for='state'>state<span>*</span></label>
                     <input name='state' id='state' onChange={handleDetails}/>
                      
                     
                    
                    </span>
                   
                   
                 </div>
                   <div>
                     <span>

                       <label for='town'>town/city<span>*</span></label>
                        <input name='town' id='town' onChange={handleDetails} />
                     </span>
                     <span>

                       <label for='zip'>zip code<span>*</span></label>
                       <input name='postal_code' id='zip' onChange={handleDetails} />
                    </span>

                   </div>
                   <div class='street'>
                     <label for='address'>street address<span>*</span></label>
                     <input name='street' id='address' onChange={handleDetails} />
                   </div>
              
                   <button>Add</button>
            
               </form>
        
          </div>
         </div>
}
        </div>
    )
}
