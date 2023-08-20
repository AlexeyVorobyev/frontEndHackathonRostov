'use client'

import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as templateReducer} from "./template/template.slice";
import {api} from "../api/api";

const reducers = combineReducers({
    template:templateReducer,
    [api.reducerPath]: api.reducer
})
export const store = configureStore({
    reducer:reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
