'use client'

import Image from 'next/image'
import styles from './styles.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store/store";
import settingsSvg from './assets/settings.svg'
import React from "react";
import classNames from "classnames";
import {SubmitHandler, useForm} from "react-hook-form";
import {useActions} from "@/redux/hooks/useActions";

export default function Cabinet() {

    const user = useSelector((state: RootState) => state.user);
    const [isRedacting,setIsRedacting] = React.useState(false);
    const {setUserDataNew} = useActions();

    interface Inputs {
        name:string
        mail:string
        phone:string
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        setUserDataNew(data);
        setIsRedacting(false);
    }

    React.useEffect(() => {
        let defaultValues = {
            name:user.name,
            mail:user.mail,
            phone:user.phone
        };
        reset({...defaultValues})
    },[])

    return (
        <main className={styles.main}>
            <div className={styles.mainWrapper}>
                <div className={styles.circle}/>
                {!isRedacting && <div className={styles.profileContainer}>
                    <h2 className={styles.header}>Мой профиль</h2>
                    <h3 className={styles.name}>{user.name}</h3>
                    <div className={styles.flex}>
                        <p className={styles.tag}>@usercool</p>
                        <p className={styles.permission}>MOD</p>
                        <p className={styles.mail}>{user.mail}</p>
                        <p className={styles.phone}>{user.phone}</p>
                    </div>
                    <button
                        className={styles.button}
                        onClick={() => setIsRedacting(true)}
                    >
                        <Image src={settingsSvg} alt={""} className={styles.icon}/>
                        <p className={styles.buttonText}>Редактировать</p>
                    </button>
                </div>}
                {isRedacting && <div className={styles.profileContainer}>
                    <h2 className={styles.header}>Мой профиль <span>/ Редактировать профиль</span></h2>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <h1 className={styles.title}>{user.name}</h1>
                        <div className={styles.inputsContainer }>
                            <div className={styles.inputContainer}>
                                <p className={styles.inputLabel}>Имя</p>
                                <input
                                    className={classNames(styles.input, errors.name ? styles.errorInput : "")}
                                    placeholder={errors.name ? "Это поле обязательно для заполнения" : "Введите название..." }
                                    {...register('name', {required:true})}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <p className={styles.inputLabel}>Почта</p>
                                <input
                                    className={classNames(styles.input, errors.mail ? styles.errorInput : "")}
                                    placeholder={errors.mail ? "Это поле обязательно для заполнения" : "Введите почту..." }
                                    {...register('mail', {required:true})}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <p className={styles.inputLabel}>Телефон</p>
                                <input
                                    className={classNames(styles.input, errors.phone ? styles.errorInput : "")}
                                    placeholder={errors.phone? "Это поле обязательно для заполнения" : "Введите телефон..." }
                                    {...register('phone', {required:true})}
                                />
                            </div>
                        </div>
                        <button className={styles.button}>
                            <p className={styles.buttonText}>Сохранить</p>
                        </button>
                    </form>
                </div>}
            </div>
        </main>
    )
}
