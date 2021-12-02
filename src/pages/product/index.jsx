import { useEffect, useRef, useState } from "react";
import { useHistory, useParams, Link} from "react-router-dom";
import ColorCircle from "../../assets/svg/colorCircle";
import Star from "../../assets/svg/star";
// import useGetSingleProduct from "../../hooks/getSingleProduct";
import colors from "../../utils/colors";
import NavBar from "../navbar"
import axios from 'axios'
import {test} from '../../config/config.json'
import './index.scss'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {addToCart, removeFromCart } from "../../appStore/cart/index.actions"








const Product = () => {
      const dispatch = useDispatch() 
    const history = useHistory()
    const id  = localStorage.getItem('itemId');
    const inputReference = useRef(null)
     const url=test;
    const [singleProduct,setSingleProduct]=useState({})
    const [image, setImage] = useState([])
    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])
    const [order,setOrder]=useState({})
    useEffect(()=>{  
        console.log('hi');  
       axios.get(`${url}products/single?id=${id}`).then(response=>{
           setSingleProduct(response.data)
           const imgSrc =JSON.parse(response.data.product_image)
           setImage(imgSrc);
           const size=JSON.parse(response.data.sizes)
           setSizes(size)
          const color =JSON.parse(response.data.color)
           setColors(color)
       })

    },[url])
    useEffect(()=>setOrder(singleProduct),[singleProduct])
    
    
   
    
    const [imageIndex, setImageIndex] = useState(0)
    // console.log(image[imageIndex])
    const [unit, setUnit] = useState(0)

    const [sizeIndex, setSizeIndex] = useState()

    useEffect(()=>setOrder({...order,unit:unit,selected:true}),[unit])
    const checkout=useRef(null)   
console.log(order)

    return(
    
    
            <div className="container">
                 <div className="productContainer">
                    <p className='top'>
                        <Link to={'/'}>Home</Link>
                        {'>'}
                        <span class='colored' onClick={()=> history.goBack()}>{singleProduct.category}</span>
                        {'>'}
                        <span>{singleProduct.product_name}</span>
                    </p>
                    <div className="div">
                        <div className="left">
                            <div className="imgLarge">
                                <img src={image[imageIndex]} alt="" />
                            </div>
                            <div className="bottomImages">
                                {
                                     image.map(img =>{
                                       let index = image.indexOf(img)
                                        return <div className="imgSmall" onClick={()=>setImageIndex(index)}>
                                            <img src={img} alt={`small image ${index}`} />
                                        </div>
                                    })
                                } 
                            </div>
                        </div>
                        <div className="right">
                            <h3>
                                {singleProduct.product_name}
                            </h3>
                            <p>
                                {singleProduct.product_detail}
                            </p>
                            <p style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop:'25px'
                            }}>
                                <Star />
                                <span style={{
                                    marginLeft: '5px'
                                }}>
                                    {singleProduct.rating>0?singleProduct.rating: 'Not rated'}
                                </span>
                            </p>
                            <p class='item_spec'>
                                Item Specifications
                            </p>
                            <div className='sizes' style={{
                                marginTop: '25px'
                            }}>
                                <p>
                                    Pick a size:
                                </p>
                                <div>
                                    {
                                        sizes.map( size => {
                                            let index = sizes?.indexOf(size)
                                            return <div onClick={()=>setOrder({...order,sizes:size})} class='size'>
                                                <span>
                                                    {size}
                                                </span>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="colors">
                                <p>
                                    Pick a color
                                </p>
                                <div>
                                    {
                                        colors.map(
                                            color =>{
                                                return <div onClick={()=>setOrder({...order,color:color})}>
                                                    <ColorCircle fill={color}/>
                                                </div>
                                            }
                                        )
                                    }
                                </div>
                            </div>
                            <div className="units">
                                <p>
                                    How many?
                                </p>
                                <div>
                                    <div >
                                        <span onClick={()=>{unit>0?setUnit(unit-1):setUnit(0)}}>
                                            -
                                        </span>
                                    </div>
                                    <input ref={inputReference} type="tel"  value={unit}/>
                                    <div >
                                        <span onClick={()=>setUnit(unit +1)} >
                                            +
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="price-div">
                                    <p>
                                        Price
                                    </p>
                                    <p className="price">
                                       ${singleProduct.price_usd}
                                    </p>
                            </div>
                            <div className="purchase">
                                <div className="buy" onClick={()=>{
                                    if(unit>0)dispatch(addToCart(order))
                                    checkout.current.click()
                                    }}>
                                     Buy now
                                </div>
                                <div className="bag" onClick={()=>{
                                    if(unit>0)dispatch(addToCart(order))}} >
                                    Add to bag
                                </div>
                                <Link to='/checkout' ref={checkout} style={{display:'none'}}/>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            
        // </div>
    )
}
export default Product