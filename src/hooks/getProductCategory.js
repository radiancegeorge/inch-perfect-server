import useAxios from "axios-hooks"
import axios from 'axios'
import {test} from '../config/config.json'
import {useEffect,useState} from 'react'
const useGetProductCategory = ()=>{
    const url=test;
    // const [{...productCategoryObject}, getProductCategory] =useAxios({
    //     url: '/products/categories',
    //     method: 'get'
    // })
    const[productCategoryObject,setProductCategory]=useState([])
    useEffect(()=>axios.get(`${url}products/categories`).then(response=>setProductCategory(response.data.categories)),[])

    return {
        productCategoryObject
    }
}
export default useGetProductCategory