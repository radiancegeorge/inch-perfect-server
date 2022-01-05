import useAxios from "axios-hooks"
import axios from 'axios'
import {useState,useEffect,useContext} from 'react'
import {test} from '../config/config.json'
import {PrefferedCurrency, ProductContext} from './userContext'

const useGetProducts = () =>{
    const {products,setProducts}=useContext(ProductContext)
    
    const url=test;
 const {userCurrency,setUserCurrency}=useContext(PrefferedCurrency)  
//    const [filterValue,setFilterValue]=useState('')
     const sort =(price_start,price_end)=>{ if(userCurrency==='USD'){
           axios.get(`${url}products?price_usd_start=${price_start}&price_usd_end=${price_end}`).then(response=>{return response.data}).then(response=>{
       response.data && setProducts(response.data)
       })}
       else{
         axios.get(`${url}products?price_ngn_start=${price_start}&price_ngn_end=${price_end}`).then(response => { return response.data }).then(response => {
             response.data && setProducts(response.data)
         })
       }
     }
   useEffect(()=>{
       axios.get(`${url}products`).then(response=>{return response.data}).then(response=>{
       console.log(response.data);
    
       response.data && setProducts(response.data)
       })
       },[url])
              const searchProducts=(name)=>{ 
           
           axios.get(`${url}products?product_name=${name}`).then(response=>{return response.data}).then(response=>{
       response.data && setProducts(response.data)
       console.log(products);
       })}

       const sortCategory=(category)=>{ 
           
           axios.get(`${url}products?category=${category}`).then(response=>{return response.data}).then(response=>{
       response.data && setProducts(response.data)})}

    return{
        products,sort,sortCategory,searchProducts
    }
}
export default useGetProducts