import {createSlice} from "@reduxjs/toolkit";
export interface User {
    id:number | undefined
    name:string
    updatedAt:string
    season:string
    status:string
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
        name:"1",
        updatedAt:"someDate",
        season:"w23",
        status:"working",
    },
    {
        id:2,
        name:"2",
        updatedAt:"someDate",
        season:"w23",
        status:"working",
    },
    {
        id:3,
        name:"3",
        updatedAt:"someDate",
        season:"w23",
        status:"plumbing",
    },
    {
        id:4,
        name:"4",
        updatedAt:"someDate",
        season:"w23",
        status:"working",
    },
    {
        id:5,
        name:"5",
        updatedAt:"someDate",
        season:"w23",
        status:"working",
    },
    {
        id:6,
        name:"6",
        updatedAt:"someDate",
        season:"w23",
        status:"working",
    },
    {
        id:7,
        name:"7",
        updatedAt:"someDate",
        season:"w23",
        status:"working",
    },
    {
        id:8,
        name:"8",
        updatedAt:"someDate",
        season:"w23",
        status:"plumbing",
    },
    {
        id:9,
        name:"9",
        updatedAt:"someDate",
        season:"w23",
        status:"working",
    },
    {
        id:10,
        name:"10",
        updatedAt:"someDate",
        season:"w23",
        status:"working",
    },
    {
        id:11,
        name:"11dddd",
        updatedAt:"someDate",
        season:"w23",
        status:"working",
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
                    season: item.season,
                    status: "TODO",
                    updatedAt: item.updated_at,
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