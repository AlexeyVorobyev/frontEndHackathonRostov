'use client'

import Image from 'next/image'
import styles from './styles.module.scss'
import {DataBaseRoutes} from "@/components/screens/moderator/routes/DataBaseRoutes/DataBaseRoutes";
import React from "react";
import {DataBaseUsers} from "@/components/screens/moderator/users/DataBaseUsers/DataBaseUsers";
import classNames from "classnames";
import {BarChart} from "@mui/x-charts/BarChart";
import {LineChart} from "@mui/x-charts/LineChart";
import UserEdit from "@/components/screens/moderator/users/UserEdit/UserEdit";

export default function Users() {
    const DeletePopup = ({handler, setIsRenderDeletePopup} : {handler:any, setIsRenderDeletePopup:any}) => {
        return (
            <div className={styles.deletePopupWrapper}>
                <div className={styles.deletePopup}>
                    <p className={styles.paragraph}>Are you sure about deleting this user?</p>
                    <div className={styles.buttonsWrapper}>
                        <div
                            className={styles.deletePopupButton}
                            onClick={() => {
                                setIsRenderDeletePopup(false);
                                document.body.style.overflowY = "visible";
                            }}
                        >
                            <p className={styles.deletePopupButtonText}>Cancel</p>
                        </div>
                        <div
                            className={styles.deletePopupButton}
                            onClick={handler.callback}
                        >
                            <p className={styles.deletePopupButtonText}>Delete</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const [isRenderDeletePopup,setIsRenderDeletePopup] = React.useState(false);
    const [deletePopupHandler,setDeletePopupHandler] = React.useState({
        callback:undefined
    })

    return (
    <main className={styles.main}>
        <div className={styles.mainWrapper}>

            <div className={classNames(styles.container,styles.containerLineChart)}>
                <div className={styles.headerContainer}>
                    <p className={styles.header}>Актуальность маршрутов среди пользователей</p>
                </div>
                <div className={styles.lineChart}>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Mon', 'Tue', 'Wed','Thu','Fri','Sat'] }]}
                        series={[
                            { data: [4, 3, 5,2,2,3], stack:'total' },
                            { data: [8, 3, 5,3,2,3], stack:'total' },
                            { data: [4, 6, 5,0,2,1], stack:'total' }
                        ]}
                        width={800}
                        height={350}
                    />
                </div>
            </div>

            <div className={classNames(styles.container,styles.containerLineChart2)}>
                <div className={styles.headerContainer}>
                    <p className={styles.header}>Статистика пользователей</p>
                </div>
                <div className={styles.lineChart}>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 4, 8, 11,15] }]}
                        series={[
                            {
                                data: [2, 11, 15, 12, 1.5, 5,25],
                            },
                        ]}
                        width={800}
                        height={350}
                    />
                </div>
            </div>

            {isRenderDeletePopup && <DeletePopup handler={deletePopupHandler} setIsRenderDeletePopup={setIsRenderDeletePopup}/>}
            <DataBaseUsers setDeletePopupHandler={setDeletePopupHandler} setIsRenderDeletePopup={setIsRenderDeletePopup}/>

            <UserEdit/>
        </div>
    </main>
    )
}
