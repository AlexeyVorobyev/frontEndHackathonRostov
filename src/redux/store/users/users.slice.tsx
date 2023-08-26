import {createSlice} from "@reduxjs/toolkit";
export interface User {
    id:number | undefined
    name:string
    email:string
    registrDate:string
    role:string
}
export interface UsersState {
    dataBase:Array<User>
    count:number
    dataBasePage:number
    defaultPageSize:number,
    sortParam: {
        name:{num:number,parameter:Array<string>} // 0 - base, 1 - ascending, 2 - descending
        changeDate:{num:number,parameter:Array<string>} // 0 - base, 1 - ascending, 2 - descending
        season:{num:number,parameter:Array<string>} // 0 - base, 1 - ascending, 2 - descending
        status:{num:number,parameter:Array<string>} // 0 - base, 1 - ascending, 2 - descending
    }
    selectParam: {
        season:"" | "S23" | "W23"
        status:string
    }
}

export const usersRawData:Array<User> = [
    {
        id:1,
        name:"Валентин Стрыкало",
        email:"jajaBinks@yandex.ru",
        role:"moderator",
        registrDate:"24.11.2022",
    },
    {
        id:2,
        name:"Роман Стрыкало",
        email:"jajaBinks2@yandex.ru",
        role:"moderator",
        registrDate:"24.11.2022",
    },
    {
        id:3,
        name:"Евпатий Коловрат",
        email:"shoooo@yandex.ru",
        role:"user",
        registrDate:"24.11.2022",
    },
    {
        id:4,
        name:"Альберт Альбертович",
        email:"shetzin@yandex.ru",
        role:"user",
        registrDate:"24.11.2022",
    },
    {
        id:5,
        name:"Акакий Акакиевич",
        email:"akakkaka@yandex.ru",
        role:"user",
        registrDate:"24.11.2022",
    },
    {
        id:6,
        name:"Виктория Викторианская",
        email:"winwin@yandex.ru",
        role:"moderator",
        registrDate:"24.11.2022",
    },
    {
        id:7,
        name:"Таран Таранов",
        email:"taran@yandex.ru",
        role:"moderator",
        registrDate:"24.11.2022",
    }
]

const initialState:UsersState = {
    dataBase: [],
    count:usersRawData.length,
    dataBasePage:1,
    defaultPageSize:5,
    sortParam: {
        name:{num:0,parameter:["","name","-name"]},
        changeDate:{num:0,parameter:["","updated_at","-updated_at"]},
        season:{num:0,parameter:["","season","-season"]},
        status:{num:0,parameter:["","status","-status"]},
    },
    selectParam: {
        season:"",
        status:""
    }
}

export const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers: {
        usersSetSortName: (state) => {
            state.sortParam.name.num = (state.sortParam.name.num + 1)%3
        },
        usersSetSortChangeDate: (state) => {
            state.sortParam.changeDate.num = (state.sortParam.changeDate.num + 1)%3
        },
        usersSetSortSeason: (state) => {
            state.sortParam.season.num = (state.sortParam.season.num + 1)%3
        },
        usersSetSortStatus: (state) => {
            state.sortParam.status.num = (state.sortParam.status.num + 1)%3
        },
        usersSetSelectSeason: (state,{payload}) => {
            state.selectParam.season = (payload.season)
        },
        usersSetSelectStatus: (state,{payload}) => {
            state.selectParam.status = (payload.status)
        },
        usersSetData: (state, {payload}) => {
            const usersArr:Array<User> = payload.results.map((item:any) => {
                const job:User = {
                    id:item.id,
                    name: item.name,
                    email:item.email,
                    role:item.role,
                    registrDate:item.registrDate
                }
                return job;
            })
            console.log(usersArr);
            console.log(payload.results)
            state.dataBase = usersArr;
        },
        usersSetDataBasePage: (state,{payload}) => {
            state.dataBasePage = payload.dataBasePage
        }
    }
})

// @ts-ignore
export const {reducer,actions} = usersSlice