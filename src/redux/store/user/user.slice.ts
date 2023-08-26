import {createSlice} from "@reduxjs/toolkit";

export interface userState {
    isAuth:boolean
    permission: "moderator" | "company" | "call" | undefined
    name:string
    mail:string
    phone:string
    token:string
}

const initialState:userState = {
    isAuth:false,
    permission:"moderator",
    name:"",
    mail:"coolUser@yandex.ru",
    phone:"+79184347948",
    token:""
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUserData: (state, {payload}) => {
            console.log(payload)
            state.name = payload.name;
            state.token = payload.token;
        },
        setUserDataNew: (state, {payload}) => {
            state.name = payload.name;
            state.phone = payload.phone;
            state.mail = payload.mail
        },
        userLogIn: (state) => {
            state.isAuth = true;
        },
        userLogOut: (state) => {
            return initialState;
        }
    }
})

export const {actions,reducer} = userSlice