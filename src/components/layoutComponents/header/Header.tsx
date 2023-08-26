import Image from 'next/image'
import styles from './styles.module.scss'
import Link from "next/link";
import verticalLine from "./assets/verticalLine.svg";
import {useSelector} from "react-redux";
import {userState} from "@/redux/store/user/user.slice";
import exitSvg from './assets/exit.svg'
import {useActions} from "@/redux/hooks/useActions";
import {RootState} from "@/redux/store/store";
import React from "react";
import {usePathname, useRouter} from "next/navigation";
import classNames from "classnames";
export default function Header() {

    const user:userState = useSelector((state: RootState) => state.user);
    const {userLogOut} = useActions();
    const router = useRouter();
    const pathname = usePathname();
    console.log(user);

    React.useEffect(() => {
        if (!user.isAuth) {
            router.push("/")
        }
    },[user.isAuth])

    return (
    <div className={styles.header}>
        <div className={styles.mainWrapper}>
            <h1 className={styles.logo}>SOUP</h1>
            <nav className={styles.navigationContainer}>
                <Link
                    className={classNames(styles.link,pathname === `/moderator/routes` ? styles.activeLink : "" )}
                    href={`/moderator/routes`}
                >Мероприятия</Link>
                <Link
                    className={classNames(styles.link,pathname === `/moderator/users` ? styles.activeLink : "" )}
                    href={`/moderator/users`}
                >Пользователи</Link>
                <Link
                    className={classNames(styles.link,pathname === `/moderator/contacts` ? styles.activeLink : "" )}
                    href={`/moderator/contacts`}
                >Контакты AVENIR</Link>
            </nav>
            {!user.isAuth && <nav className={styles.navigationProfileContainer}>
                <Link className={styles.link} href={"./null"}>Вход</Link>
                <Image className={styles.svg} src={verticalLine} alt={"|"}/>
                <Link className={styles.link} href={"./logIn"}>Регистрация</Link>
            </nav>}
            {user.isAuth && <nav className={styles.navigationProfileContainer}>
                <div className={styles.circle}>
                    <p className={styles.text}>{user.name.substring(0,2).toUpperCase()}</p>
                </div>
                <Link
                    className={classNames(styles.link,pathname === `/moderator/cabinet` ? styles.activeLink : "" )}
                    href={"./cabinet"}
                >{user.name}</Link>
                <Image
                    className={styles.svg}
                    src={exitSvg}
                    alt={"Выйти"}
                    onClick={() => userLogOut()}
                />
            </nav>}
        </div>
    </div>
    )
}
