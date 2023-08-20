'use client'

import styles from './styles.module.scss';
import Image from "next/image";
import odnoklSvg from './assets/odnokl.svg';
import vkontakteSvg from './assets/vkontakte.svg';
import telegramSvg from './assets/telegram.svg';
import { useForm, SubmitHandler } from "react-hook-form"
import classNames from "classnames";
import {useActions} from "@/redux/hooks/useActions";
import {useSelector} from "react-redux";
import { useRouter } from 'next/navigation';

export default function Registration() {

    interface Inputs {
        name:string
        mail:string
        phone:string
        password:string
        confirmPassword:string
    }

    const {setUserData, userLogIn} = useActions();
    const user = useSelector((state: RootState) => state.user)
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        // типа получил токен
        const token = "12345qwerty"
        setUserData({...data,token:token})
        userLogIn();
        router.push("/")

    } // запрос на сервер

    return (
      <section className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <h1 className={styles.title}>Регестрация</h1>
              <div className={styles.inputsContainer }>
                  <div className={styles.inputContainer}>
                      <p className={styles.inputLabel}>ФИО</p>
                      <input
                          className={classNames(styles.input, errors.name ? styles.errorInput : "")}
                          placeholder={errors.name ? "Это поле обязательно для заполнения" : "Введите ФИО..." }
                          {...register('name', {required:true})}
                      />
                  </div>
                  <div className={styles.inputContainer}>
                      <p className={styles.inputLabel}>Email</p>
                      <input
                          className={classNames(styles.input, errors.mail ? styles.errorInput : "")}
                          placeholder={errors.mail ? "Это поле обязательно для заполнения" : "Введите Email..." }
                          {...register('mail', {required:true})}
                      />
                  </div>
                  <div className={styles.inputContainer}>
                      <p className={styles.inputLabel}>Номер телефона</p>
                      <input
                          className={classNames(styles.input, errors.phone ? styles.errorInput : "")}
                          placeholder={errors.phone ? "Это поле обязательно для заполнения" : "Введите номер..." }
                          {...register('phone', {required:true})}
                      />
                  </div>
                  <div className={styles.inputContainer}>
                      <p className={styles.inputLabel}>Пароль</p>
                      <input
                          className={classNames(styles.input, errors.password ? styles.errorInput : "")}
                          placeholder={errors.password ? "Это поле обязательно для заполнения" : "Введите пароль..." }
                          {...register('password', {required:true})}
                      />
                  </div>
                  <div className={styles.inputContainer}>
                      <p className={styles.inputLabel}>Повторите пароль</p>
                      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p> }
                      <input
                          className={classNames(styles.input, errors.confirmPassword ? styles.errorInput : "")}
                          placeholder={errors.confirmPassword ? "Это поле обязательно для заполнения" : "Введите пароль повторно..." }
                          {...register('confirmPassword', {
                              required:true,
                              validate: (value:string) => {
                                  if (watch('password') !== value) {
                                      return "Пароли не совпадают";
                                  }
                              }
                          })}
                      />
                  </div>
              </div>
              <div className={styles.outerLinksContainer}>
                  <Image className={styles.link} src={odnoklSvg} alt={""}/>
                  <Image className={styles.link} src={vkontakteSvg} alt={""}/>
                  <Image className={styles.link} src={telegramSvg} alt={""}/>
              </div>
              <button className={styles.button}>
                  <p className={styles.buttonText}>Зарегестрироваться</p>
              </button>
          </form>
      </section>
    )
}