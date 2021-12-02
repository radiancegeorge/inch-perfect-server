import React from 'react'
import axios from 'axios'
import {test} from '../../config/config.json'


export default function PersonalDetails() {
   const url=test;
    const [countries,setCountries]=React.useState([])
 React.useEffect(()=>{
        axios.get("https://restcountries.com/v3.1/all/").then(response=>{ return response.data})
        .then(response=>{
            setCountries(response.map(country=>{
                return country.name.common
            }))
        }
        )
        
        },[])
        const [data,setData]=React.useState({})
        const handleDetails=(e)=>{
               setData({...data,[e.target.name]:e.target.value})
        }
         const update=async (body)=>{
        // setLoginObject(true)
         try {
            const { status, data } = await axios.post(`${url}user/update_billing_info`, JSON.stringify(body), {
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem("inchToken")}`,
                    "content-type": "application/json"
                }
            });
                console.log(data)
                // setLoginObject(false)
                // setRedirect(true)
                localStorage.setItem('first_name',data.first_name)
                localStorage.setItem('last_name',data.last_name)
                localStorage.setItem('inchToken',data.token)

        } catch (error) {
            
            console.log(error.response.data.error)
                // setLoginObject(false)

        }     
    }
   
    return (
        <div class='personal'>
            <p>Personal information</p>
            <form onSubmit={(e)=>{
                e.preventDefault()
                console.log(data);
                update(data)
            }}>
              <div>  
                   <span>
                    <label for='first'> first name<span>*</span></label>
                     <input name='first_name' id='first' value={localStorage.getItem('first_name')} />
                   </span>
                   <span>
                    <label for='last'>last name<span>*</span></label>
                     <input name='last_name' id='last' value={localStorage.getItem('last_name')} />
                    </span>
              </div>
              <div>
                   <span>
                    <label for='display'>display name<span>*</span></label>
                    <div class='name'>
                     <div class='at'>@</div><input name='display_name' id='display' />
                     </div>
                    </span>
                    <span>
                    <label for='phone'> phone<span>*</span></label>
                    {/* <div class='name'> */}
                     <input type='number' name='phone_number' id='phone' onChange={handleDetails} />
                    {/* </div> */}
                    </span>
              </div>
                <span class='exp'>This will be how your name will be displayed in the account section and in reviews</span>

              <div class='billing'>
                  <p>Billing Address</p>
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
                      
                     
                     {/* </select> */}
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
              </div>
                   <button>save</button>
            
            </form>
        </div>
    )
}
