import useAxios from "axios-hooks"

const useSignUp = () =>{
    const [{...signUpObject}, signUp] = useAxios({
        url: "/user/register",
        method: "post"
    },{
        manual: true
    })
    return{
        signUpObject, signUp
    }
}

export default useSignUp