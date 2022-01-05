import React from 'react'
import useGetProductCategory from '../../hooks/getProductCategory';
import { useEffect, useRef, useState } from 'react';
import productImg from '../../assets/png/product.png'
import Add from '../../assets/svg/add.jsx';
import useGetProducts from '../../hooks/getProducts.js';
import { useLoadMore } from 'react-load-more-hook';
import Loader from "react-loader-spinner";
import {RiArrowDownSLine} from 'react-icons/all'
import colors from '../../utils/colors'
import Tick from '../../assets/svg/tick.jsx';
import Close from '../../assets/svg/Close';

import Cancel from '../../assets/svg/cancel.jsx';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import {addToCart, removeFromCart } from "../../appStore/cart/index.actions"
import Components from './Components'
import { useDispatch } from 'react-redux';
import {ProductContext} from '../../hooks/userContext'

export default function ProductsContainer() {
    const [productData, setProductData] = useState([])
    const [chosenCategory, setChosenCategory] = useState('All Products');
    const [patternValue, setPatternValue] = useState(0)
    
    // const handleGetProducts = (reqParams) =>{
    //     getProducts({
    //         url:`products?limit=9&${reqParams}`
    //     })

    // }

    
    const handleDropdown = () =>{
        setDropped(!dropped)
    }
     const history = useHistory()
    const {productCategoryObject} = useGetProductCategory()
    const {sort,sortCategory} = useGetProducts()
    const [page, setPage] = useState(1)
    const [reqParams, setReqParams] = useState('')
    
    const {products,setProducts}=React.useContext(ProductContext)

    // useEffect(()=>getProducts(),[])
    const dispatch = useDispatch()

    console.log(products);
    const [parameter,setParameter]=useState({min:'',max:''})
    
    
    
    const handleFilter = () =>{
        setFilter(!filter)
    }
    const [filter, setFilter] = useState(false)
    const [dropped,setDropped] = useState(false)

    // useEffect(()=> {
    //     handleGetProducts(reqParams)
    // }, [reqParams])
    const patternReference = useRef(null)
 const categories = productCategoryObject 

    useEffect(()=>{
        if(filter){
            patternReference?.current.checked ? setPatternValue(1):setPatternValue(0)
            console.log(patternReference.current.checked)
        }
    },[patternReference?.current?.checked])

    useEffect(()=> {
        if(filter){
            patternReference.current.checked = patternValue
        }
    }, [filter])

    const cart = useSelector(state => state.cart);
    const [includedInCart, setIncludedInCart] = useState(false)
    useEffect(()=>{
        cart.includes(productData) && setIncludedInCart(true)
    }, [])

    const sortedPorductData = productData.map(item => {
        console.log(cart)
         return cart.indexOf(item) > -1 && true
    })
    const [left,setLeft]=React.useState(-50)
    
    return (
        <div className="productContaainer">
            <p onClick={()=>setLeft(0)} class='filter-button'>Filter</p>
                {filter &&
                    <div className="filterDiv">
                        <div className="filterOptions">
                            <div onClick={()=> handleFilter()} className="filterButton">
                                <span>Filter</span> <RiArrowDownSLine />
                            </div>
                            <div className="filterSettings">
                                <div className="price">
                                    <p>
                                        Price
                                    </p>
                                    <input type="tel" onChange={(e)=>setParameter({...parameter,min:e.target.value})} name="" id="" placeholder='Min'/>
                                    <input type="tel" onChange={(e)=>setParameter({...parameter,max:e.target.value})} name="" id="" placeholder='Max'/>
                                </div>
                                <div className="pattern">
                                    <p>
                                        Pattern
                                    </p>
                                    <div>
                                        <span>
                                            Show Pattern
                                        </span>
                                        <span>
                                            <input ref={patternReference} type="checkbox" name="" id="" />
                                        </span>
                                    </div>
                                </div>
                               
                                <div className="color">
                                    <p >
                                        Color
                                     {dropped &&  <div  onClick={()=>handleDropdown()}> <Close /></div>}
                                    </p>
                                    {
                                        !dropped &&
                                        <div onClick={()=>handleDropdown()} className="dropTrigger">
                                            <span >
                                                Select color(s)
                                            </span>
                                            <RiArrowDownSLine />
                                        </div>
                                    }
                                    {
                                        dropped &&
                                        <ul>
                                            <li class='header' onClick={()=>handleDropdown()}>
                                                <Tick />
                                            
                                            </li>
                                            <div>
                                            {
                                                colors.map((color)=>{
                                                    console.log(color.icon)
                                                    return <li>
                                                        <span>{color.color}</span>
                                                        <span>{color.icon}</span>
                                                    </li>
                                                })
                                            }
                                            </div>
                                        </ul>
                                    }
                                </div>
                                 <div className="filterSubmit">
                                    <p className="save" onClick={()=>{
                                        sort(parameter.min,parameter.max)
                                        // getProducts()
                                       
                                    }}>
                                        <span>Save</span>
                                    </p>
                                    <p className="reset" onClick={()=>{setFilter(!filter)
                                     sort()
                                    }}>
                                        <span>Reset</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="categories" style={{left:`${left}%`}}>
                    <h4>
                        Categories
                    </h4>
                    <ul>
                        {
                        categories.map( category=>(
                            <li onClick={()=>{
                                sortCategory(category.category)
                                setChosenCategory(category.category)
                            }} className={`${chosenCategory === category.category && 'active'}`}>
                                {category.category}
                            </li>
                        ) )
                        }
                    </ul>
                    <div className="filterButton" onClick={()=> {
                        handleFilter()
                        setLeft(-50)
                        }
                        }>
                        <span>Filter</span> <RiArrowDownSLine />
                    </div>
                    
                </div>
                <div onClick={()=>setLeft(-50)} className="productDiv">
                  { products && products.map(product=>(
                      <Components data={product} page={true} />
                   ))}
                </div>
                <div className="frame">
                    
                        <p>
                            {
                                chosenCategory
                            }
                        </p>
                    
                </div>
            </div>
    )
}
