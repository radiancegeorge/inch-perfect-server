import NavBar from '../navbar.jsx';
import './index.css';
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
import Cancel from '../../assets/svg/cancel.jsx';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import {addToCart, removeFromCart } from "../../appStore/cart/index.actions"
import { useDispatch } from 'react-redux';
import Cart from '../cart/index.jsx';

const Products = () =>{
    const history = useHistory()
    const {productCategoryObject} = useGetProductCategory()
    const {products, getProducts} = useGetProducts()
    const [page, setPage] = useState(1)
    const [reqParams, setReqParams] = useState('')
    const dispatch = useDispatch()
    useEffect(()=>{
        getProducts({
            url:'products?limit=9'
        })
    },[])
    
    useEffect(()=>{
        products.data && setProductData(products.data ? products.data.data : [])
    }, [products.data])
    const categories = productCategoryObject.data ? productCategoryObject.data.categories : []
    const [productData, setProductData] = useState([])
    const [chosenCategory, setChosenCategory] = useState('All Products');
    const [patternValue, setPatternValue] = useState(0)
    
    const handleGetProducts = (reqParams) =>{
        getProducts({
            url:`products?limit=9&${reqParams}`
        })

    }

    
    // const handleDropdown = () =>{
    //     setDropped(!dropped)
    // }
    const handleFilter = () =>{
        setFilter(!filter)
    }
    const [filter, setFilter] = useState(false)
    const [dropped,setDropped] = useState(false)

    useEffect(()=> {
        handleGetProducts(reqParams)
    }, [reqParams])
    const patternReference = useRef(null)
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
    const [overlay, setOverlay] = useState(false)
    const handleSetOverlay = () =>{
        setOverlay(!overlay)
    }
    const cart = useSelector(state => state.cart);
    const [includedInCart, setIncludedInCart] = useState(false)
    useEffect(()=>{
        cart.includes(productData) && setIncludedInCart(true)
    }, [])
    // console.log(cart)
    const sortedPorductData = productData.map(item => {
        console.log(cart)
         return cart.indexOf(item) > -1 && true
    })

    console.log(sortedPorductData)
    
    return(
        <div className='appContainer'>
            <NavBar handleSetOverlay={handleSetOverlay}/>
            {overlay && <Cart overlay = {overlay} setOverlay={setOverlay}/>}
            <div className="productContaainer">
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
                                    <input type="tel" name="" id="" placeholder='Min'/>
                                    <input type="tel" name="" id="" placeholder='Max'/>
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
                                <div className="filterSubmit">
                                    <p className="save" onClick={()=>{
                                        setReqParams(chosenCategory !== 'All Products' ? `category=${chosenCategory}&pattern=${patternValue}`:`pattern=${patternValue}`)
                                        setFilter(!filter)
                                    }}>
                                        <span>Save</span>
                                    </p>
                                    <p className="reset" onClick={()=>setFilter(!filter)}>
                                        <span>Reset</span>
                                    </p>
                                </div>
                                {/* <div className="color">
                                    <p>
                                        Color
                                    </p>
                                    {
                                        !dropped &&
                                        <div onClick={()=>handleDropdown()} className="dropTrigger">
                                            <span>
                                                Select color(s)
                                            </span>
                                            <RiArrowDownSLine />
                                        </div>
                                    }
                                    {
                                        dropped &&
                                        <ul>
                                            <li>
                                                <Tick />
                                                <Cancel />
                                            </li>
                                            {
                                                colors.map((color)=>{
                                                    console.log(color.icon)
                                                    return <li>
                                                        <span>{color.color}</span>
                                                        <span>{color.icon}</span>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    }
                                </div> */}
                            </div>
                        </div>
                    </div>
                }
                <div className="categories">
                    <h4>
                        Categories
                    </h4>
                    <ul>
                        {
                        categories.map(
                            category=>
                            <li onClick={()=>{
                                setReqParams('category='+category.category)
                                setChosenCategory(category.category)
                            }} className={`${chosenCategory === category.category && 'active'}`}>
                                {category.category}
                            </li>
                        ) 
                        }
                    </ul>
                    <div className="filterButton" onClick={()=> handleFilter()}>
                        <span>Filter</span> <RiArrowDownSLine />
                    </div>
                    
                </div>
                <div className="productDiv">
                    {
                        productData?.map(
                            product =>{ 
                                // console.log(product, cart)
                                const image = JSON.parse(product.product_image)[0]
                                return(<div onClick={()=> history.push(`/product/${product.id}`)} className="product">
                                <img src={image} alt="" />
                                <div className="productDetails">
                                    <div className="productDescription">
                                        {product.product_detail}
                                    </div>
                                    <div className="priceAndAdd" onClick={e=>e.stopPropagation()}>
                                        <span>
                                            {product.price_ngn}
                                        </span>
                                        {
                                            !cart.includes(product) && <div onClick={()=>{
                                                dispatch(addToCart(product))
                                            }} className="addProduct">
                                                <Add />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>)}
                        )
                         
                    }
                    
                </div>
                <div className="frame">
                    
                        <p>
                            {
                                chosenCategory
                            }
                        </p>
                    
                </div>
            </div>
        </div>
    )
}
export default Products