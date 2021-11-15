import { useEffect, useRef, useState } from "react";
import { useHistory, useParams, Link} from "react-router-dom";
import ColorCircle from "../../assets/svg/colorCircle";
import Star from "../../assets/svg/star";
import useGetSingleProduct from "../../hooks/getSingleProduct";
import colors from "../../utils/colors";
import NavBar from "../navbar"
import './index.css'
const Product = () => {
    const history = useHistory()
    let { id } = useParams();
    const inputReference = useRef(null)
    const [unit, setUnit] = useState(0)
    const {singleProduct, getSingleProduct} = useGetSingleProduct()

    useEffect(()=>{
        getSingleProduct({
            url: `products/single?id=${id}`
        })
    },[])
    useEffect(()=>{
        if(unit!=0){
            inputReference.current.value = unit
        }
        console.log(unit)
    }, [unit])
    const [imageIndex, setImageIndex] = useState(0)
    const [image, setImage] = useState()
    const [sizes, setSizes] = useState()
    const [sizeIndex, setSizeIndex] = useState()
    const [colors, setColors] = useState()
    useEffect(()=>{
        singleProduct?.data && setImage(JSON.parse(singleProduct.data.product_image));
        singleProduct?.data && setSizes(JSON.parse(singleProduct.data.sizes));
        singleProduct?.data && setColors(JSON.parse(singleProduct.data.color));
    },[singleProduct?.data])
        
    console.log(singleProduct?.data)

    return(
        <div>
            <NavBar />
            {singleProduct.data &&<div className="container">
                <div className="productContainer">
                    <p className='top'>
                        <Link to={'/'}>Home</Link>
                        {'>'}
                        <span onClick={()=> history.push('/')}>{singleProduct?.data?.category}</span>
                        {'>'}
                        <span>{singleProduct?.data?.product_name}</span>
                    </p>
                    <div className="div">
                        <div className="left">
                            <div className="imgLarge">
                                <img src={image && image[imageIndex]} alt={`Product image ${imageIndex}`} />
                            </div>
                            <div className="bottomImages">
                                {
                                    image && image.map(img =>{
                                       let index = image.indexOf(img)
                                        return <div className="imgSmall" onClick={()=>setImageIndex(index)}>
                                            <img src={img[index]} alt={`small image ${index}`} />
                                        </div>
                                    })
                                } 
                            </div>
                        </div>
                        <div className="right">
                            <h3>
                                {singleProduct.data.product_name}
                            </h3>
                            <p>
                                {singleProduct.data.product_detail}
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
                                    {singleProduct.data.rating>0?singleProduct.data.rating: 'Not rated'}
                                </span>
                            </p>
                            <p style={{
                                borderBottom: '2px solid black',
                                display: 'inline-block',
                                marginTop: '25px',
                                padding: '5px 0px'
                            }}>
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
                                       sizes && sizes.map( size => {
                                            let index = sizes?.indexOf(size)
                                            return <div>
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
                                        colors && colors.map(
                                            color =>{
                                                return <div>
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
                                    <div onClick={()=> unit > 0 && setUnit(unit-1)}>
                                        <span>
                                            -
                                        </span>
                                    </div>
                                    <input ref={inputReference} type="tel" placeholder='0'/>
                                    <div onClick={()=>unit < 5 && setUnit(unit+1)}>
                                        <span>
                                            +
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="price">
                                    <p>
                                        Price
                                    </p>
                                    <p className="price">
                                        {
                                          `$ ${singleProduct.data.price_usd}`  
                                        }
                                    </p>
                            </div>
                            <div className="purchase">
                                <div className="buy">
                                    Buy now
                                </div>
                                <div className="bag">
                                    Add to bag
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            
        </div>
    )
}
export default Product