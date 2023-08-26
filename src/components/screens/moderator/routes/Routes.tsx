'use client'

import Image from 'next/image'
import styles from './styles.module.scss'
import {DataBaseRoutes} from "@/components/screens/moderator/routes/DataBaseRoutes/DataBaseRoutes";
import React from "react";
import classNames from "classnames";
import {ChartDoughnut} from './ChartDoughnut/ChartDoughnut'
import { LineChart } from '@mui/x-charts/LineChart';
import RouteEdit from "@/components/screens/moderator/routes/RouteEdit/RouteEdit";
import {AddPopup} from "@/components/screens/moderator/routes/AddPopup/AddPopup";

export default function Routes() {

    const DeletePopup = ({handler, setIsRenderDeletePopup} : {handler:any, setIsRenderDeletePopup:Function}) => {
        return (
            <div className={styles.deletePopupWrapper}>
                <div className={styles.deletePopup}>
                    <p className={styles.paragraph}>Вы уверены что хотите удалить это мероприятие?</p>
                    <div className={styles.buttonsWrapper}>
                        <div
                            className={styles.deletePopupButton}
                            onClick={() => {
                                setIsRenderDeletePopup(false);
                                document.body.style.overflowY = "visible";
                            }}
                        >
                            <p className={styles.deletePopupButtonText}>Отмена</p>
                        </div>
                        <div
                            className={styles.deletePopupButton}
                            onClick={handler.callback}
                        >
                            <p className={styles.deletePopupButtonText}>Удалить</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    const [isRenderAddPopup,setIsRenderAddPopup] = React.useState(false)

    const [isRenderDeletePopup,setIsRenderDeletePopup] = React.useState(false);
    const [deletePopupHandler,setDeletePopupHandler] = React.useState({
        callback:undefined
    })

    return (
    <main className={styles.main}>
        <div className={styles.mainWrapper}>

            <div className={classNames(styles.container,styles.containerLineChart)}>
                <div className={styles.headerContainer}>
                    <p className={styles.header}>Статистика мероприятий</p>
                </div>
                <div className={styles.lineChart}>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 11,15] }]}
                        series={[
                            {
                                data: [2, 5.5, 15, 8.5, 1.5, 5,8],
                            },
                        ]}
                        width={1000}
                        height={350}
                    />
                </div>
            </div>

            <div className={classNames(styles.container,styles.containerChart)}>
                <div className={styles.headerContainer}>
                    <p className={styles.header}>Сезонный спрос</p>
                </div>
                <div className={styles.diagram}>
                    <ChartDoughnut quanityArr={[10,20]}/>
                </div>
            </div>

            {isRenderDeletePopup && <DeletePopup handler={deletePopupHandler} setIsRenderDeletePopup={setIsRenderDeletePopup}/>}
            {isRenderAddPopup && <AddPopup setIsRenderAddPopup={setIsRenderAddPopup}/>}
            <DataBaseRoutes setDeletePopupHandler={setDeletePopupHandler} setIsRenderDeletePopup={setIsRenderDeletePopup} setIsRenderAddPopup={setIsRenderAddPopup}/>

            <RouteEdit/>
        </div>
    </main>
    )
}
