import { Fragment } from "react"

export default function Category({data}){
     const image= JSON.parse(data.product_image)
    return(
        <Fragment>
            <div className="cat_boxes">
                <div className="img">
                    <img src={image[0]} alt="" />
                </div>
                <div className="name">
                    {data.category}
                </div>
            </div>
        </Fragment>
    )
}