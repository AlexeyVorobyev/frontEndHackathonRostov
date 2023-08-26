import classNames from "classnames";
import styles from "./style.module.scss";
import React from "react";
import {useActions} from "@/redux/hooks/useActions";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store/store";
import {Route} from "@/redux/store/routes/routes.slice";
import {SubmitHandler, useForm} from "react-hook-form";

export const AddPopup = ({setIsRenderAddPopup} : {setIsRenderAddPopup:Function}) => {

    interface Inputs {
        name:string
        season:string
        description:string
        status:string
    }

    const routes = useSelector((state: RootState) => state.routes)
    const {routesAddElem} = useActions()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<Inputs>();

    function getRandomInt(max:number) {
        return Math.floor(Math.random() * max);
    }
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        let now = new Date();
        routesAddElem({item:{...data,id:getRandomInt(100000),updatedAt:now.toLocaleString()}})
        setIsRenderAddPopup(false);
        document.body.style.overflowY = "visible";
    }

    React.useEffect(() => {
        let defaultValues = {
            name:"",
            season:"",
            description:"",
            status:""
        };
        reset({...defaultValues})
    },[])

    return (
        <div className={styles.wrapper}>
            <div className={classNames(styles.container,styles.containerEdit)}>
                <div className={styles.headerContainer}>
                    <p className={styles.header}>Создание мероприятия</p>
                </div>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputsContainer }>
                        <div className={styles.inputContainer}>
                            <p className={styles.inputLabel}>Название</p>
                            <input
                                className={classNames(styles.input, errors.name ? styles.errorInput : "")}
                                placeholder={errors.name ? "Это поле обязательно для заполнения" : "Введите название..." }
                                {...register('name', {required:true})}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <p className={styles.inputLabel}>Сезон</p>
                            <input
                                className={classNames(styles.input, errors.season ? styles.errorInput : "")}
                                placeholder={errors.season ? "Это поле обязательно для заполнения" : "Введите сезон..." }
                                {...register('season', {required:true})}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <p className={styles.inputLabel}>Статус</p>
                            <input
                                className={classNames(styles.input, errors.status ? styles.errorInput : "")}
                                placeholder={errors.status ? "Это поле обязательно для заполнения" : "Введите статус..." }
                                {...register('status', {required:true})}
                            />
                        </div>
                        <div className={classNames(styles.inputContainer,styles.textArea)}>
                            <p className={styles.inputLabel}>Описание</p>
                            <textarea
                                className={classNames(styles.input, errors.description ? styles.errorInput : "")}
                                placeholder={errors.description? "Это поле обязательно для заполнения" : "Введите описание..." }
                                {...register('description', {required:true})}
                            />
                        </div>

                    </div>
                    <button className={styles.button}>
                        <p className={styles.buttonText}>Сохранить</p>
                    </button>
                </form>
            </div>
        </div>
    )
}