import useAxios from "axios-hooks"

const useGetSingleProduct = () =>{
    const [{...singleProduct}, getSingleProduct] = useAxios({
        method:'get'
    },{
        manual: true
    })
    return{
        singleProduct, getSingleProduct
    }
}

export default useGetSingleProduct