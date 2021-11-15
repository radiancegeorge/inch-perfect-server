import useAxios from "axios-hooks"

const useGetProductCategory = () =>{
    const [{...productCategoryObject}, getProductCategory] =useAxios({
        url: '/products/categories',
        method: 'get'
    })
    return{
        productCategoryObject
    }
}
export default useGetProductCategory