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
import {User} from "@/redux/store/users/users.slice";
import {usersRawData} from "@/redux/store/users/users.slice";
const DataBaseUsers = ({setDeletePopupHandler,setIsRenderDeletePopup} : {setDeletePopupHandler:any,setIsRenderDeletePopup:any}) => {
    const DataBaseRow = ({data}: {data:User}) => {

        // const [deleteJob] = useDeleteJobMutation();
        // const [createJob] = useCreateJobMutation();

        return (
            <>
                <div className={styles.dataBaseRow}>
                    <div
                        className={classNames(styles.rowElem,styles.rowElemLink)}
                        // state={{jobId:data.id}}
                    >
                        <p className={styles.rowElemText}>{data.name}</p>
                    </div>
                    <div className={styles.rowElem}>
                        <p className={styles.rowElemText}>{data.registrDate}</p>
                    </div>
                    <div className={styles.rowElem}>
                        <p className={styles.rowElemText}>{data.email}</p>
                    </div>
                    <div className={styles.rowElem}>
                        <p className={styles.rowElemText}>{data.id}</p>
                    </div>
                    <div className={styles.rowElem}>
                        <p className={styles.rowElemText}>{data.role}</p>
                    </div>
                    <div className={styles.rowElem}>
                        <Image src={dataBaseActionEditSvg} alt={""} className={styles.rowElemSvgAction}/>
                        <Image
                            src={dataBaseActionCopySvg}
                            alt={""}
                            className={styles.rowElemSvgAction}
                            onClick={() => {
                                const searchJob = users.dataBase.filter((job:User) => job.id === data.id);
                                // createJob(searchJob[0]);
                            }}
                        />
                        <Image src={dataBaseActionDeleteSvg}
                            alt={""}
                            className={styles.rowElemSvgAction}
                            onClick={() => {
                                setDeletePopupHandler({
                                    callback:() => {
                                        // await deleteJob({jobId:data.id});
                                        if (users.dataBase.length === 1) {
                                            usersSetDataBasePage({dataBasePage:1});
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
                            usersSetDataBasePage({dataBasePage:page})
                            usersSetData({results:usersRawData.filter((item,index) => index >= (page-1)*users.defaultPageSize && index < page*users.defaultPageSize)});
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
                <p className={styles.buttonContainerLabel}>{users.count !== 0 ? dataBasePageSize * (dataBasePage-1) + 1 : 0} to {Math.min(dataBasePageSize * dataBasePage,count)} items of {count}</p>
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
    const users = useSelector((state: RootState) => state.users);
    const {
        usersSetDataBasePage,
        usersSetData,
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
         usersSetData({results:usersRawData.filter((item,index) => index >= (users.dataBasePage-1)*users.defaultPageSize && index < users.dataBasePage*users.defaultPageSize)});
         console.log(users)
    },[]) //Необходимо прописать дату в зависимостях

    return (
        <div className={classNames(styles.dataBase,styles.dataBaseJobs)}>
            <div className={styles.dataBaseHeader}>
                <h2 className={styles.dataBaseTitle}>Пользователи</h2>
                {/*<div className={styles.dataBaseSelectorContainer}>*/}
                {/*    <p className={styles.dataBaseSelectorName}>Сезон</p>*/}
                {/*    <BasicSelect*/}
                {/*        idSelect={"seasonSelect"}*/}
                {/*        items={[*/}
                {/*            {*/}
                {/*                name:"All",*/}
                {/*                value:""*/}
                {/*            },*/}
                {/*            {*/}
                {/*                name:"W23",*/}
                {/*                value:"W23"*/}
                {/*            },*/}
                {/*            {*/}
                {/*                name:"S23",*/}
                {/*                value:"S23"*/}
                {/*            }*/}
                {/*        ]}*/}
                {/*        callback={(value:string) => null}*/}
                {/*        // callback={(value:string) => jobsSetSelectSeason({season:value})}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div className={styles.dataBaseSelectorContainer}>*/}
                {/*    <p className={styles.dataBaseSelectorName}>Статус</p>*/}
                {/*    <BasicSelect*/}
                {/*        idSelect={"statusSelect"}*/}
                {/*        items={[*/}
                {/*            {*/}
                {/*                name:"All",*/}
                {/*                value:""*/}
                {/*            },*/}
                {/*            {*/}
                {/*                name:"New",*/}
                {/*                value:"new"*/}
                {/*            },*/}
                {/*            {*/}
                {/*                name:"Running",*/}
                {/*                value:"run"*/}
                {/*            },*/}
                {/*            {*/}
                {/*                name:"Ready",*/}
                {/*                value:"ready"*/}
                {/*            },*/}
                {/*            {*/}
                {/*                name:"Error",*/}
                {/*                value:"error"*/}
                {/*            },*/}
                {/*        ]}*/}
                {/*        callback={(value:string) => null}*/}
                {/*        // callback={(value:string) => jobsSetSelectStatus({status:value})}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<Link*/}
                {/*    href={"null"}*/}
                {/*    className={styles.navLink}*/}
                {/*>*/}
                {/*    <button className={styles.dataBaseButtonAdd}>*/}
                {/*        <Image src={dataBaseButtonAddSvg} alt={""} className={styles.dataBaseButtonAddSvg}/>*/}
                {/*        <p className={styles.dataBaseButtonAddText}>Новый маршрут</p>*/}
                {/*    </button>*/}
                {/*</Link>*/}
            </div>
            <div className={styles.dataBaseRows}>
                <div className={styles.dataBaseRowInfo}>
                    <div
                        className={classNames(styles.infoLabelContainer,styles.infoLabelContainerClickable)}
                        // onClick={() => jobsSetSortName()}
                    >
                        <p className={styles.infoLabelText}>Имя</p>
                        <Image src={dataBaseSwitcherOffSvg} alt={""} className={styles.dataBaseSwitcherSvg}/>
                        {/*{jobs.sortParam.name.num === 1 && (<DataBaseSwitcherOnUp className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                        {/*{jobs.sortParam.name.num === 2 && (<DataBaseSwitcherOnDown className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                    </div>
                    <div
                        className={classNames(styles.infoLabelContainer,styles.infoLabelContainerClickable)}
                        // onClick={() => jobsSetSortChangeDate()}
                    >
                        <p className={styles.infoLabelText}>Дата регистрации</p>
                        <Image src={dataBaseSwitcherOffSvg} alt={""} className={styles.dataBaseSwitcherSvg}/>
                        {/*{jobs.sortParam.changeDate.num === 1 && (<DataBaseSwitcherOnUp className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                        {/*{jobs.sortParam.changeDate.num === 2 && (<DataBaseSwitcherOnDown className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                    </div>
                    <div
                        className={classNames(styles.infoLabelContainer,styles.infoLabelContainerClickable)}
                        // onClick={() => jobsSetSortSeason()}
                    >
                        <p className={styles.infoLabelText}>Email</p>
                        <Image src={dataBaseSwitcherOffSvg} alt={""} className={styles.dataBaseSwitcherSvg}/>
                        {/*{jobs.sortParam.season.num === 1 && (<DataBaseSwitcherOnUp className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                        {/*{jobs.sortParam.season.num === 2 && (<DataBaseSwitcherOnDown className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                    </div>
                    <div
                        className={classNames(styles.infoLabelContainer,styles.infoLabelContainerClickable)}
                        // onClick={() => jobsSetSortStatus()}
                    >
                        <p className={styles.infoLabelText}>ID</p>
                        <Image src={dataBaseSwitcherOffSvg} alt={""} className={styles.dataBaseSwitcherSvg}/>
                        {/*{jobs.sortParam.status.num === 1 && (<DataBaseSwitcherOnUp className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                        {/*{jobs.sortParam.status.num === 2 && (<DataBaseSwitcherOnDown className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                    </div>
                    <div
                        className={classNames(styles.infoLabelContainer,styles.infoLabelContainerClickable)}
                        // onClick={() => jobsSetSortStatus()}
                    >
                        <p className={styles.infoLabelText}>Role</p>
                        <Image src={dataBaseSwitcherOffSvg} alt={""} className={styles.dataBaseSwitcherSvg}/>
                        {/*{jobs.sortParam.status.num === 1 && (<DataBaseSwitcherOnUp className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                        {/*{jobs.sortParam.status.num === 2 && (<DataBaseSwitcherOnDown className={styles.dataBaseSwitcherOverlaySvg}/>)}*/}
                    </div>
                    <div className={styles.infoLabelContainer}>
                        <p className={styles.infoLabelText}>Actions</p>
                    </div>
                </div>


                {users.dataBase.length !== 0 && users.dataBase.map((user:User) => <DataBaseRow data={user} key={user.id}/>)}
                {/*{isSuccess && jobs.dataBase.map((job:Job) => <DataBaseRow data={job} key={job.id}/>)}*/}
                {/*{isLoading && <p>loading...</p>}*/}
                {/*{error && <p>some mistake occurred</p>}*/}

            </div>
            {contracted && <p className={styles.dataBaseButtonMore} onClick={() => setContracted(false)}>раскрыть...</p>}
            {!contracted && <DataBaseButtonsContainer
                count={users.count}
                dataBasePage={users.dataBasePage}
                dataBasePageSize={users.defaultPageSize}
            />}
        </div>
    )
}

export {DataBaseUsers}