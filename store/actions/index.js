import {LOGIN_USER ,LOGOUT_USER } from "./../actionType"

export const loginUser = () => {
    return {
        type : LOGIN_USER
    }
}

export const logoutUser = () => {
    return {
        type : LOGOUT_USER
    }
}