import useAxios from "axios-hooks"

const useLogin = () =>{
     const [{...loginObject}, login] = useAxios({
         url: "/user/login",
         method: "post"
     }, 
     {
         manual: true
    }
    )
    return{
        loginObject, login
    }
}
export default useLogin