//import {Job} from "../../../../redux/store/QueueAnalyze/jobs.slice";
import styles from "./style.module.scss";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store/store";
import {useActions} from "@/redux/hooks/useActions";
import classNames from "classnames";
import BasicSelect from "@/components/ui-elements/BasicSelect/BasicSelect";
import dataBaseSwitcherOffSvg from './assets/dataBaseSwitchers/dataBaseSwitcherOff.svg';
import dataBaseSwitcherOnUp from './assets/dataBaseSwitchers/dataBaseSwitcherOnUp.svg';
import dataBaseSwitcherOnDown from './assets/dataBaseSwitchers/dataBaseSwitcherOnDown.svg';
import dataBaseSeasonSunSvg from './assets/dataBaseIcons/sun.svg';
import dataBaseActionEditSvg from './assets/dataBaseIcons/actions/edit.svg';
import dataBaseActionDownSvg from './assets/dataBaseIcons/actions/down.svg';
import dataBaseActionReloadSvg from './assets/dataBaseIcons/actions/reload.svg';
import dataBaseActionCopySvg from './assets/dataBaseIcons/actions/what.svg';
import dataBaseActionDeleteSvg from './assets/dataBaseIcons/actions/delete.svg';
import dataBaseButtonAddSvg from './assets/dataBaseIcons/actions/plusButtonSVG.svg';
// import {useGetJobsQuery, useDeleteJobMutation, useCreateJobMutation} from "../../../../redux/api/jobs.api";
import Image from "next/image";
import Link from "next/link";
import {Route} from "@/redux/store/routes/routes.slice";
import {routesRawData} from "@/redux/store/routes/routes.slice";
import {random} from "nanoid";
import {randomInt} from "crypto";

const DataBaseRoutes = ({setDeletePopupHandler,setIsRenderDeletePopup,setIsRenderAddPopup} : {setDeletePopupHandler:Function,setIsRenderDeletePopup:Function,setIsRenderAddPopup:Function}) => {
    const DataBaseRow = ({data}: {data:Route}) => {

        // const [deleteJob] = useDeleteJobMutation();
        // const [createJob] = useCreateJobMutation();

        return (
            <>
                <div className={styles.dataBaseRow}>
                    <div
                        className={classNames(styles.rowElem,styles.rowElemLink)}
                        onClick={() =>  routesUpdateId({id:data.id})}
                    >
                        <p className={styles.rowElemText}>{data.name}</p>
                    </div>
                    <div className={styles.rowElem}>
                        <p className={styles.rowElemText}>{data.updatedAt}</p>
                    </div>
                    <div className={styles.rowElem}>
                        <Image src={dataBaseSeasonSunSvg} alt={""} className={styles.rowElemSvg}/>
                        <p className={styles.rowElemText}>{data.season}</p>
                    </div>
                    <div className={styles.rowElem}>
                        <Image src={dataBaseSeasonSunSvg} alt={""} className={styles.rowElemSvg}/>
                        <p className={styles.rowElemText}>{data.status}</p>
                    </div>
                    <div className={styles.rowElem}>
                        <Image
                            src={dataBaseActionEditSvg}
                            alt={""}
                            className={styles.rowElemSvgAction}
                            onClick={() =>  routesUpdateId({id:data.id})}
                        />
                        <Image
                            src={dataBaseActionCopySvg}
                            alt={""}
                            className={styles.rowElemSvgAction}
                            onClick={() => {
                                const searchRoute = routes.dataBase.filter((job:Route) => job.id === data.id);
                                function getRandomInt(max:number) {
                                    return Math.floor(Math.random() * max);
                                }
                                const item = {...searchRoute[0]}
                                item.id = getRandomInt(10000);
                                item.updatedAt = (new Date()).toLocaleString();
                                routesAddElem({item:item})
                            }}
                        />
                        <Image src={dataBaseActionDeleteSvg}
                            alt={""}
                            className={styles.rowElemSvgAction}
                            onClick={() => {
                                setDeletePopupHandler({
                                    callback:() => {
                                        routesDeleteDataRoute({id:data.id})
                                        if (routes.dataBase.length === 1) {
                                            routesSetDataBasePage({dataBasePage:1});
                                        }
                                        setIsRenderDeletePopup(false);
                                        document.body.style.overflowY = "visible";
                                    }
                                })
                                setIsRenderDeletePopup(true);
                                document.body.style.overflowY = "hidden";
                            }}
                        />
                    </div>
                </div>
            </>
        )
    }

    const DataBaseButtonsContainer = ({count,dataBasePage,dataBasePageSize}: {count:number,dataBasePage:number,dataBasePageSize:number}) => {

        console.log(count,dataBasePage,dataBasePageSize)
        const DataBaseButton = ({page}: {page: number}) => {

            if (dataBasePage === page) {
                return (
                    <div className={classNames(styles.dataBaseButton,styles.active)}>
                        <p className={classNames(styles.dataBaseButtonText,styles.active)}>{page}</p>
                    </div>
                )
            }
            else {
                return (
                    <div
                        className={classNames(styles.dataBaseButton,styles.disActive)}
                        onClick={() => {
                            routesSetDataBasePage({dataBasePage:page})
                        }}
                    >
                        <p className={classNames(styles.dataBaseButtonText,styles.disActive)}>{page}</p>
                    </div>
                )
            }
        }

        const Skeleton = () => {
            return (
                <div className={styles.dataBaseSkeleton}>
                    <p className={styles.dataBaseSkeletonText}>...</p>
                </div>
            )
        }

        const buttonsAmount = Math.ceil(count/dataBasePageSize);

        return (
            <div className={styles.dataBaseButtonsContainer}>
                <p className={styles.buttonContainerLabel}>{routes.count !== 0 ? dataBasePageSize * (dataBasePage-1) + 1 : 0} to {Math.min(dataBasePageSize * dataBasePage,count)} items of {count}</p>
                <div className={styles.buttonsWrapper}>
                    {(() => {
                        const arr = [];

                        let start = 0;
                        if (dataBasePage - 3 <= 1) start = 1
                        else {
                            arr.push(<DataBaseButton page={1} key={1}/>);
                            arr.push(<Skeleton key={'SKELETON_1'}/>);
                            start = dataBasePage - 2;
                        }
                        let end = 0;
                        if (dataBasePage + 3 >= buttonsAmount) end = buttonsAmount - 1
                        else end = dataBasePage + 2;
                        for (let i = start; i <= end; i++) {
                            arr.push(<DataBaseButton page={i} key={i}/>)
                        }

                        if (dataBasePage + 3 < buttonsAmount) arr.push(<Skeleton key={'SKELETON_2'}/>);
                        if (buttonsAmount !== 0)arr.push(<DataBaseButton page={buttonsAmount} key={buttonsAmount}/>)

                        return arr
                    })()}
                </div>
            </div>
        )
    }

    const [contracted,setContracted] = React.useState(true);
    const routes = useSelector((state: RootState) => state.routes);
    const {
        routesSetDataBasePage,
        routesSetData,
        routesDeleteDataRoute,
        routesSetSortName,
        routesSetSelectSeason,
        routesAddElem,
        routesUpdateId
    } = useActions();

    // const {data,error,isLoading,isFetching,isSuccess} = useGetJobsQuery(
    //     {
    //         dataBasePage:jobs.dataBasePage,
    //         defaultPageSize:jobs.defaultPageSize,
    //         orderingParam:getSortParameters(jobs.sortParam),
    //         selectParam:jobs.selectParam,
    //         airportId:airport.id
    //     })


    React.useEffect(() => {
         routesSetData({results:routes.rawDataBase.filter((item) => item.season.includes(routes.selectParam.season)).filter((item,index) => index >= (routes.dataBasePage-1)*routes.defaultPageSize && index < routes.dataBasePage*routes.defaultPageSize)});
         console.log(routes)
    },[routes.rawDataBase, routes.dataBasePage]) //Необходимо прописать дату в зависимостях

    return (
        <div className={classNames(styles.dataBase,styles.dataBaseJobs)}>
            <div className={styles.dataBaseHeader}>
                <h2 className={styles.dataBaseTitle}>Мероприятия</h2>
                <div className={styles.dataBaseSelectorContainer}>
                    <p className={styles.dataBaseSelectorName}>Сезон</p>
                    <BasicSelect
                        idSelect={"seasonSelect"}
                        items={[
                            {
                                name:"All",
                                value:""
                            },
                            {
                                name:"W23",
                                value:"w23"
                            },
                            {
                                name:"S23",
                                value:"s23"
                            }
                        ]}
                        callback={(value:string) => routesSetSelectSeason({season:value})}
                        // callback={(value:string) => jobsSetSelectSeason({season:value})}
                    />
                </div>
                <div className={styles.dataBaseSelectorContainer}>
                    <p className={styles.dataBaseSelectorName}>Статус</p>
                    <BasicSelect
                        idSelect={"statusSelect"}
                        items={[
                            {
                                name:"All",
                                value:""
                            },
                            {
                                name:"New",
                                value:"new"
                            },
                            {
                                name:"Running",
                                value:"run"
                            },
                            {
                                name:"Ready",
                                value:"ready"
                            },
                            {
                                name:"Error",
                                value:"error"
                            },
                        ]}
                        callback={(value:string) => null}
                        // callback={(value:string) => jobsSetSelectStatus({status:value})}
                    />
                </div>
                <button
                    className={styles.dataBaseButtonAdd}
                    onClick={() => {
                        setIsRenderAddPopup(true);
                        document.body.style.overflowY = "hidden";
                    }}
                >
                    <Image src={dataBaseButtonAddSvg} alt={""} className={styles.dataBaseButtonAddSvg}/>
                    <p className={styles.dataBaseButtonAddText}>Новое мероприятие</p>
                </button>
            </div>
            <div className={styles.dataBaseRows}>
                <div className={styles.dataBaseRowInfo}>
                    <div
                        className={classNames(styles.infoLabelContainer,styles.infoLabelContainerClickable)}
                        onClick={() => routesSetSortName()}
                    >
                        <p className={styles.infoLabelText}>Название</p>
                        <Image src={dataBaseSwitcherOffSvg} alt={""} className={styles.dataBaseSwitcherSvg}/>
                        {routes.sortParam.name.num === 1 && (<Image src={dataBaseSwitcherOnUp} alt={""} className={styles.dataBaseSwitcherOverlaySvg}/>)}
                        {routes.sortParam.name.num === 2 && (<Image src={dataBaseSwitcherOnDown} alt={""} className={styles.dataBaseSwitcherOverlaySvg}/>)}
                    </div>
                    <div
                        className={classNames(styles.infoLabelContainer,styles.infoLabelContainerClickable)}
                        // onClick={() => jobsSetSortChangeDate()}
                    >
                        <p className={styles.infoLabelText}>Последнее изменение</p>
                        <Image src={dataBaseSwitcherOffSvg} alt={""} className={styles.dataBaseSwitcherSvg}/>
                        {/*{jobs.sortParam.changeDate.num === 1 && (<DataBaseSwitcherOnUp className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                        {/*{jobs.sortParam.changeDate.num === 2 && (<DataBaseSwitcherOnDown className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                    </div>
                    <div
                        className={classNames(styles.infoLabelContainer,styles.infoLabelContainerClickable)}
                        // onClick={() => jobsSetSortSeason()}
                    >
                        <p className={styles.infoLabelText}>Сезон</p>
                        <Image src={dataBaseSwitcherOffSvg} alt={""} className={styles.dataBaseSwitcherSvg}/>
                        {/*{jobs.sortParam.season.num === 1 && (<DataBaseSwitcherOnUp className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                        {/*{jobs.sortParam.season.num === 2 && (<DataBaseSwitcherOnDown className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                    </div>
                    <div
                        className={classNames(styles.infoLabelContainer,styles.infoLabelContainerClickable)}
                        // onClick={() => jobsSetSortStatus()}
                    >
                        <p className={styles.infoLabelText}>Статус</p>
                        <Image src={dataBaseSwitcherOffSvg} alt={""} className={styles.dataBaseSwitcherSvg}/>
                        {/*{jobs.sortParam.status.num === 1 && (<DataBaseSwitcherOnUp className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                        {/*{jobs.sortParam.status.num === 2 && (<DataBaseSwitcherOnDown className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                    </div>
                    <div className={styles.infoLabelContainer}>
                        <p className={styles.infoLabelText}>Actions</p>
                    </div>
                </div>


                {routes.dataBase.length !== 0 && routes.dataBase.map((route:Route) => <DataBaseRow data={route} key={route.id}/>)}
                {/*{isSuccess && jobs.dataBase.map((job:Job) => <DataBaseRow data={job} key={job.id}/>)}*/}
                {/*{isLoading && <p>loading...</p>}*/}
                {/*{error && <p>some mistake occurred</p>}*/}

            </div>
            {contracted && <p className={styles.dataBaseButtonMore} onClick={() => setContracted(false)}>раскрыть...</p>}
            {!contracted && <DataBaseButtonsContainer
                count={routes.count}
                dataBasePage={routes.dataBasePage}
                dataBasePageSize={routes.defaultPageSize}
            />}
        </div>
    )
}

export {DataBaseRoutes}