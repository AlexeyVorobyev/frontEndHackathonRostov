import {createSlice} from "@reduxjs/toolkit";

export interface userState {
    isAuth:boolean
    name:string
    mail:string
    phone:string
    token:string
}

const initialState:userState = {
    isAuth:false,
    name:"",
    mail:"",
    phone:"",
    token:""
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUserData: (state, {payload}) => {
            state.name = payload.name;
            state.mail = payload.mail;
            state.phone = payload.phone;
            state.token = payload.token;
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