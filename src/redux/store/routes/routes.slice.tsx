import {createSlice} from "@reduxjs/toolkit";
export interface Route {
    id:number | undefined
    name:string
    updatedAt:string
    season:string
    status:string
    description:string
}
export interface RoutesState {
    dataBase:Array<Route>
    rawDataBase:Array<Route>
    selectedRouteId:number
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

export const routesRawData:Array<Route> = [
    {
        id:1,
        name:"Путь воды",
        updatedAt:(new Date()).toLocaleString(),
        season:"w23",
        status:"working",
        description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
    },
    {
        id:2,
        name:"Путь огня",
        updatedAt:(new Date()).toLocaleString(),
        season:"w23",
        status:"working",
        description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
    },
    {
        id:3,
        name:"Воздух гор",
        updatedAt:(new Date()).toLocaleString(),
        season:"w23",
        status:"plumbing",
        description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
    },
    {
        id:4,
        name:"Северные волки",
        updatedAt:(new Date()).toLocaleString(),
        season:"w23",
        status:"working",
        description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
    },
    {
        id:5,
        name:"Корольевский завтрак",
        updatedAt:(new Date()).toLocaleString(),
        season:"s23",
        status:"working",
        description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
    },
    {
        id:6,
        name:"Гигантский обрыв",
        updatedAt:(new Date()).toLocaleString(),
        season:"s23",
        status:"working",
        description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
    },
    {
        id:7,
        name:"Последний заезд",
        updatedAt:(new Date()).toLocaleString(),
        season:"w23",
        status:"working",
        description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
    },
    {
        id:8,
        name:"Отель - триваго",
        updatedAt:(new Date()).toLocaleString(),
        season:"w23",
        status:"plumbing",
        description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
    },
    {
        id:9,
        name:"Варвара беги беги",
        updatedAt:(new Date()).toLocaleString(),
        season:"s23",
        status:"working",
        description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
    },
    {
        id:10,
        name:"Кусты и шахты",
        updatedAt:(new Date()).toLocaleString(),
        season:"s23",
        status:"working",
        description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
    },
    {
        id:11,
        name:"25 тысяч лет",
        updatedAt:(new Date()).toLocaleString(),
        season:"w23",
        status:"working",
        description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
    }
]

const initialState:RoutesState = {
    dataBase: [],
    rawDataBase:routesRawData,
    count:routesRawData.length,
    dataBasePage:1,
    selectedRouteId:1,
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

export const routesSlice = createSlice({
    name:"routes",
    initialState,
    reducers: {
        routesSetSortName: (state) => {
            state.sortParam.name.num = (state.sortParam.name.num + 1)%3
            if (state.sortParam.name.num === 1) {
                const arr = [...routesRawData]
                arr.sort((a:Route,b:Route) => {
                    return ("" + a.name).localeCompare(b.name)
                })
                state.dataBase = arr.filter((item,index) => index >= (state.dataBasePage-1)*state.defaultPageSize && index < state.dataBasePage*state.defaultPageSize);
            }
            else if (state.sortParam.name.num === 2) {
                const arr = [...routesRawData]
                arr.sort((a:Route,b:Route) => {
                    return ("" + a.name).localeCompare(b.name)*-1
                })
                state.dataBase = arr.filter((item,index) => index >= (state.dataBasePage-1)*state.defaultPageSize && index < state.dataBasePage*state.defaultPageSize);
            }
            else state.dataBase = state.rawDataBase.filter((item,index) => index >= (state.dataBasePage-1)*state.defaultPageSize && index < state.dataBasePage*state.defaultPageSize);
        },
        routesSetSortChangeDate: (state) => {
            state.sortParam.changeDate.num = (state.sortParam.changeDate.num + 1)%3
        },
        routesSetSortSeason: (state) => {
            state.sortParam.season.num = (state.sortParam.season.num + 1)%3
        },
        routesSetSortStatus: (state) => {
            state.sortParam.status.num = (state.sortParam.status.num + 1)%3
        },
        routesSetSelectSeason: (state,{payload}) => {
            state.selectParam.season = (payload.season)
            const filtered = state.rawDataBase.filter((item) => item.season.includes(payload.season)).filter((item,index) => index >= (state.dataBasePage-1)*state.defaultPageSize && index < state.dataBasePage*state.defaultPageSize).length
            console.log(filtered)
            state.dataBase = state.rawDataBase.filter((item) => item.season.includes(payload.season)).filter((item,index) => index >= (state.dataBasePage-1)*state.defaultPageSize && index < state.dataBasePage*state.defaultPageSize);
            state.count = state.rawDataBase.filter((item) => item.season.includes(payload.season)).length
        },
        routesSetSelectStatus: (state,{payload}) => {
            state.selectParam.status = (payload.status)
        },
        routesSetData: (state, {payload}) => {
            const routesArr:Array<Route> = payload.results.map((item:any) => {
                const job:Route = {
                    id:item.id,
                    name: item.name,
                    season: item.season,
                    status: item.status,
                    updatedAt: item.updatedAt,
                    description: item.description
                }
                return job;
            })
            console.log(routesArr);
            console.log(payload.results)
            state.count = state.rawDataBase.filter((item) => item.season.includes(state.selectParam.season)).length
            state.dataBase = routesArr;
        },
        routesAddElem: (state, {payload}) => {
            console.log(payload)
            state.rawDataBase = [...state.rawDataBase,payload.item]
        },
        routesSetDataBasePage: (state,{payload}) => {
            state.dataBasePage = payload.dataBasePage
        },
        routesDeleteDataRoute: (state, {payload}) => {
            state.rawDataBase = state.rawDataBase.filter((item) => item.id !== payload.id)
        },
        routesUpdateDataRoute: (state,{payload}) => {
            let newArr = state.rawDataBase.map((elem) => elem);
            newArr = newArr.map((elem:Route) => {
                if (elem.id === payload.id) {
                    elem.name = payload.name;
                    elem.season = payload.season;
                    elem.description = payload.description;
                    elem.updatedAt = (new Date()).toLocaleString();
                    return elem
                }
                else return elem
            })
            console.log(newArr)
            state.rawDataBase = newArr
        },
        routesUpdateId: (state,{payload}) => {
            state.selectedRouteId = payload.id
        }
    }
})
export const {reducer,actions} = routesSlice