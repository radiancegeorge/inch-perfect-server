import { useState } from "react"

const CartItem = ({cartItem, image, countCount}) => {
    const [count, setCount] = useState(1)

    return(
        <div className='cartProduct'>
            <img src={image} alt="" />
            <div className="details">
                <p>
                    {cartItem.product_detail}
                </p>
                <div className="priceAdd">
                    <span className='price'>
                        ${cartItem.price_usd*count}
                    </span>
                    <div>
                        <span onClick={()=>{
                            count>1 && setCount(count -1)
                        }}>-</span>
                        <span className='units'>{count}</span>
                        <span onClick={()=>{
                            count<5 && setCount(count +1)
                        }}>+</span>
                    </div>
                </div>
            </div>s
        </div>
    )
}
export default CartItem