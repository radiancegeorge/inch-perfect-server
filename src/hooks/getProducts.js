import useAxios from "axios-hooks"

const useGetProducts = () =>{
    const [{...products}, getProducts] = useAxios({
        method:'get',
        
    },{
        manual: true
    })
    return{
        products, getProducts
    }
}
export default useGetProducts