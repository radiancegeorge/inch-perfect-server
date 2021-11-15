import {ADD_TO_CART, REMOVE_FROM_CART, EDIT_PROPERTIES} from "./index.types";
const defaultState = [

]


const cart = (state = defaultState, { type, payload}) => {
    switch(type){
        case ADD_TO_CART:
            return [
                ...state, payload
            ]
        case REMOVE_FROM_CART:
            //just send in an id
            return state.map(data => {
                if(data.id !== payload) return data
            }).filter(data => data && data);
        case EDIT_PROPERTIES:
            //send in an object that must contain the id of product
            return state.map(data => {
                if(data.id === payload.id){
                    return {
                        ...data, ...payload
                    }
                }else{
                    return data
                }

            })
        default:
        return state
    }
}

export default cart