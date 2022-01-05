import React from 'react'
import AddImage from '../../../assets/svg/addImage'
import RemoveImage from '../../../assets/svg/RemoveImage'
import Good from '../../../assets/svg/Good'
import {test}  from '../../../config/config.json'
import axios from 'axios'
import ViewProducts from '../Products'
import ColorCircle from '../../../assets/svg/colorCircle'


export default function AddProduct() {
    
    const [images,setImages]=React.useState([{id:'',image:''}])
    const imageRef =React.useRef(null)
    const [imageId,setImageId]=React.useState(0)
    const [imageUrl,setImageUrl]=React.useState();
    const [imgArray,setImgArray]=React.useState([])
    const formData = new FormData()
    const url=test;
    React.useEffect(()=>{
      if(imageUrl){
            const reader= new FileReader();
            setImageId(imageId+1);
            reader.onloadend = ()=>{
              setImages([...images,{id:imageId,image:reader.result}])
              console.log(images);

             
            }
            reader.readAsDataURL(imageUrl)
      }
    },[imageUrl])
    const [sizes,setSizes]=React.useState([])
    const [colors,setColors]=React.useState([])
    const [size,setSize]=React.useState('')
    const [color,setColor]=React.useState('')
    const [product,setProuct]=React.useState({})
    const [currency,setCurrency]=React.useState('NGN')
    const [prices,setPrices]=React.useState({
      price_ngn:'',
      price_usd:''
    })
    const [pattern,setPattern]=React.useState(1)
    const star=<span class='red'>*</span>
     console.log(imgArray)
     React.useEffect(()=>{
       const sortColor=colors.filter(color=>color!=='')
       setColors(sortColor)
     },[color])

     console.log(images)
    const addProduct= async(e)=>{
       e.preventDefault()

       for (let index = 0; index < imgArray.length; index++) {
          formData.append('cover',imgArray[index])
         
       }
          formData.append('color',JSON.stringify(colors)) 
          formData.append('sizes',JSON.stringify(sizes))
       formData.append('category',product.category)
       formData.append('product_name',product.name)
       formData.append('product_detail',product.detail)
       formData.append('pattern',pattern)
       formData.append('price_usd',prices.price_usd)
       formData.append('price_ngn',prices.price_ngn)
         for (var pair of formData.entries()) {
                               console.log(pair[0]+ ', ' + pair[1]); 
                             }
          try {
             const { status, data } = await axios({
                   method: 'post',
                    url: `${url}products/create_product`,
                  headers: {
                      "content-type": "application/json",
                      "Authorization": `Bearer ${token}`

        },
        data:formData

    })
    console.log(formData);
    console.log(status, data);
   }
       catch (error) {
           console.log(error.response)
   console.log(formData);
    
  }  
    
    }
    const token = localStorage.getItem('inchToken')
    const headers= {
                      "content-type": "application/json",
                      "Authorization": `Bearer ${token}`
        }
    const [cats,setCats]=React.useState([])    
  console.log(colors);

 React.useEffect(()=>axios.get(`${url}products/categories`,{headers:headers}).then(response=>{console.log(response.data.categories)
        setCats(response.data.categories)})
        ,[url])
    const colorSet=['red','blue','black','white','purple','yellow','gray','green']
    return (
      <ViewProducts>
          <form class='form' onSubmit={addProduct}>
            <p>Item Information</p>
            <div>
               <label>
               <span>Name {star}</span>
               <input name='name' type='text' onChange={(e)=>setProuct({...product,[e.target.name]:e.target.value})}/>
               </label>
               <label>
                <span>Category{star}</span>
                <select onChange={(e)=>setProuct({...product,category:e.target.value})}>
                   <option selected disabled hidden>Select Category</option>
                   {cats && cats.map(category=>(
                     <option value={category.category}>{category.category}</option>
                   ))}
                
                </select>
               </label>
            </div>
            <div>
               <label style={{position:'relative',width:'20%'}}>
                 <span>color(s){star}</span>
              <div class='pattern' style={{ padding: '2px' }}> <select type='text' style={{ padding: '2px' }} onChange={(e) => setColor(e.target.value)} class='size'>
                    {colorSet.map((color)=>(
                        <option value={color}>{color}</option>
                      )
                    )}
                </select><span onClick={() =>
                setColors([...colors, color])
              }><Good /></span></div>
              <div style={{display:'flex',position:'absolute',marginBottom:'0',top:'80px'}}>{
                colors.map(size =>
                  (<span style={{ height:'fit-content', marginRight: '8px', display:'flex' }}><ColorCircle fill={size} /></span>)
                )
              }
              </div>
               </label>
               <label>
                 <span>pattern{star}</span>
                 <div class='pattern'><p>Dress has pattern</p> <input type='checkbox' onChange={(e)=>e.target.checked?setPattern(2):setPattern(1)}/></div> 
               </label>
            </div>
            <div style={{marginBottom:'0px'}}>
               <label>
                <span>sizes{star}</span>
                <div class='pattern'><input type='text' onChange={(e)=>setSize(e.target.value)} class='size'/> <span onClick={()=>setSizes([...sizes,size])}><Good /></span> </div>
               
               </label>
                
               <label>
                  <span> price{star}</span>
                 <div  class='price' ><select onChange={(e)=>setCurrency(e.target.value)} >
                 <option value="NGN">NGN</option>
                 <option value="USD">USD</option>
                 </select><input type='text' onChange={(e)=>currency==='NGN'?setPrices({...prices,price_ngn:e.target.value}):setPrices({...prices,price_usd:e.target.value})}/></div>
               </label>
            </div>
              <span style={{width:'60%'}}>
                   {
                    sizes&&  sizes.map(size=>
                     (<span style={{textTransform:'uppercase',marginRight:'8px', marginBottom:'20px'}}>{size}</span>)
                     )
                   }
                </span>
                <div style={{margin:'30px'}}>
                   <textarea style={{width:'90%', height:'100px'}} name='detail' onChange={(e)=>setProuct({...product,[e.target.name]:e.target.value})} placeholder='Product Details'/>
                  
                </div>
              <div class='image' style={{marginBottom:'0'}}> 
                   <p>Add Images<span>{star}</span></p>
               <div class='container' style={{marginBottom:'0'}}>
                  <div class='imageArray' style={{marginBottom:'0'}}>
                   {
                    imageId>0 && images.filter(image=> {return image.image!==''}).map(image=>
                       ( <div class='addImage' style={{marginBottom:'0'}}>
                          <img src={image.image} alt=''/>
                          <span class='add' onClick={()=>{
                            setImages(images.filter(img=>img.id!==image.id))
                          }}><AddImage /></span>
                       </div>)
                     )
                   }
                </div>

                
                <div class='addImage'>
                   <span onClick={()=>imageRef.current.click()}><RemoveImage /></span>
                   <input ref={imageRef} type='file' accept='image/*' style={{display:'none'}}
                     onChange={(e)=>{
                       const file= e.target.files[0];
                       if(file){
                         setImgArray([...imgArray,file])
                         
                         setImageUrl(file);}
                     }}
                   
                    />
                </div>
            </div>
            </div>
                <button >Add product</button>
        </form>

      </ViewProducts>
           )
}
