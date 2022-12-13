//import des actions
import { ADD_PRODUCT, DELETE_PRODUCT, 
    SET_COMMAND,SET_CHOICE,SET_LOGIN,DISCONNECT } from "../constants/actions"

    
export const addProduct = (payload) =>{
    return{
        type: ADD_PRODUCT,payload
    }
}
export const setCommand = payload =>{
    return{
        type: SET_COMMAND, payload
    }
}

export const setChoice = payload =>{
    return{
        type: SET_CHOICE, payload
    }
}

export const deleteProduct = payload =>{
    return{
        type: DELETE_PRODUCT, payload
    }
}

export const setLogin = payload =>{
    return{
        type: SET_LOGIN, payload
    }
}

export const disconnect = payload =>{
    return{
        type: DISCONNECT, payload
    }
}