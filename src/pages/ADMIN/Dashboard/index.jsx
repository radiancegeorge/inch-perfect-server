import React,{useState} from 'react'
import Logo from '../../../assets/png/logo.png'
import PlusCircle from '../../../assets/svg/PlusCircle'
import ViewEye from '../../../assets/svg/ViewEye'
import './index.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {test} from '../../../config/config.json'


export default function DashBoard() {
    const url=test;
    const token=localStorage.getItem('inchToken')
    const [cat,setCat]=useState({name:''})
    const createCategory=async(params)=>{
          try {
             const { status, data } = await axios({
                   method: 'post',
                    url: `${url}products/category`,
                    headers: {
                      "content-type": "application/json",
                      "Authorization": `Bearer ${token}`
        },
        data:params

    })
    
    console.log(status, data,params);
   }
       catch (error) {
           console.log(error.response)
   
    
  }  
    }
    const deleteCategory=(params)=>axios.delete(`${url}products/category?id=${params}`,{headers:headers}).then(catList())
   const headers= {
                      "content-type": "application/json",
                      "Authorization": `Bearer ${token}`
        }
    
    const [showCategory,setShowCategory]=useState(false)
    const [content,setContent]=useState()   
    const [cats,setCats]=useState([])    
    const catList=()=>axios.get(`${url}products/categories`,{headers:headers}).then(response=>{
        console.log(response.data.categories)
        setCats(response.data.categories)})
    const [view,setView]=useState(false)
         
    return (
        <div class='dashBoard'>
           <div class='head'><img src={Logo} alt='logo'/></div>
           <div class='body'>
               <Link > <div class='div'> <div class='white-div'><PlusCircle /><span onClick={()=>{
                   setShowCategory(!showCategory)
                   setView(false)
                   
               
               }}>Add Category</span></div> </div></Link>
               <Link to='/admin/see-order'> <div class='div'> <div class='white-div'><ViewEye /><span>View Order</span></div> </div></Link>

               <Link > <div class='div'> <div class='white-div'><ViewEye /><span onClick={()=>{
                   setShowCategory(!showCategory)
                   setView(true)
                   catList()
                   
               
               }}> View Categories</span></div> </div></Link>
               <Link to='/admin/products'> <div class='div'> <div class='white-div'><ViewEye /><span>View product</span></div> </div></Link>
               <Link to='/admin/addproduct'> <div class='div'> <div class='white-div'><PlusCircle /><span>Add product</span></div> </div></Link>
               

              {showCategory && <div onClick={()=>setShowCategory(false)} class='add-category'>
                 {
                     !view && <div onClick={(e)=>e.stopPropagation()} class='add-container'>
                                    <input type='text'placeholder='Enter New Category' onChange={(e)=>setCat({name:e.target.value})} /> <span onClick={()=>cat?createCategory(cat):''}><PlusCircle /></span>
                              </div>
                 }
                 
                 {view && <div onClick={(e)=>e.stopPropagation()} class='category-list'>
                            {cats.map(category=>(
                    <div class='cat-items'><span>{category.category}</span><span onClick={()=>{    
                        deleteCategory(category.id);
                    }} style={{color:'red'}}>remove</span></div>))}
                      </div>
                 }
               </div>
}
           </div>
            
        </div>
    )
}
