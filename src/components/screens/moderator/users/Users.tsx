'use client'

import Image from 'next/image'
import styles from './styles.module.scss'
import {DataBaseRoutes} from "@/components/screens/moderator/routes/DataBaseRoutes/DataBaseRoutes";
import React from "react";
import {DataBaseUsers} from "@/components/screens/moderator/users/DataBaseUsers/DataBaseUsers";

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
            {isRenderDeletePopup && <DeletePopup handler={deletePopupHandler} setIsRenderDeletePopup={setIsRenderDeletePopup}/>}
            <DataBaseUsers setDeletePopupHandler={setDeletePopupHandler} setIsRenderDeletePopup={setIsRenderDeletePopup}/>
        </div>
    </main>
    )
}
