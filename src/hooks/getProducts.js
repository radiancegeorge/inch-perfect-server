import useAxios from "axios-hooks"
import axios from 'axios'
import {useState,useEffect} from 'react'
import {test} from '../config/config.json'

const useGetProducts = () =>{
    const [products,setProducts]=useState([])
    
    const url=test;
   
//    const [filterValue,setFilterValue]=useState('')
     const sort =(price_ngn_start,price_ngn_end)=>{
           axios.get(`${url}products?price_ngn_start=${price_ngn_start}&price_ngn_end=${price_ngn_end}`).then(response=>{return response.data}).then(response=>{
       response.data && setProducts(response.data)
       })
     }
   useEffect(()=>{
       axios.get(`${url}products`).then(response=>{return response.data}).then(response=>{
       console.log(response.data);
    
       response.data && setProducts(response.data)
       })
       },[url])

       const sortCategory=(category)=>{ 
           
           axios.get(`${url}products?category=${category}`).then(response=>{return response.data}).then(response=>{
       response.data && setProducts(response.data)})}

    return{
        products,sort,sortCategory
    }
}
export default useGetProducts