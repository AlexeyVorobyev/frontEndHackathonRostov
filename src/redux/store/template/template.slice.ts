'use client'

import {createSlice} from "@reduxjs/toolkit";

export interface TemplateState {
    //interface
}

const initialState:TemplateState = {
    //init
}

export const templateSlice = createSlice({
    name:'template',
    initialState,
    reducers: {
        //some reducers
    }
})

export const {actions,reducer} = templateSlice