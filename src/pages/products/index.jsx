import NavBar from '../navbar.jsx';
import './index.scss';
// import useGetProductCategory from '../../hooks/getProductCategory';
import { useEffect, useRef, useState } from 'react';
// import productImg from '../../assets/png/product.png'
// import Add from '../../assets/svg/add.jsx';
// import useGetProducts from '../../hooks/getProducts.js';
// import { useLoadMore } from 'react-load-more-hook';
// import Loader from "react-loader-spinner";
import {RiArrowDownSLine} from 'react-icons/all'
import colors from '../../utils/colors'
import Tick from '../../assets/svg/tick.jsx';
import Cancel from '../../assets/svg/cancel.jsx';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import {addToCart, removeFromCart } from "../../appStore/cart/index.actions"
import { useDispatch } from 'react-redux';
import Cart from '../cart/index.jsx';
import useGetProducts from '../../hooks/getProducts'


const Products = ({children}) =>{
   
    const {searchProducts}=useGetProducts()
    const [overlay, setOverlay] = useState(false)
    const handleSetOverlay = () =>{
        setOverlay(!overlay)
    }
    const [sc_search,setSc_Search]=useState(false)

    const clickSearch=()=>{
        setSc_Search(!sc_search)
    }
    
    return(
        
        <div className='appContainer'>
            <NavBar search={clickSearch} handleSetOverlay={handleSetOverlay}/>
            {sc_search && <div class='sc_search'><input placeholder='Search.....' onChange={(e)=>searchProducts(e.target.value)} /></div>}
            {overlay && <Cart overlay = {overlay} setOverlay={setOverlay}/>}
             {children}
        </div>
    )
}
export default Products