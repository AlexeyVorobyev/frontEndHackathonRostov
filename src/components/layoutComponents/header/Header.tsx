import Image from 'next/image'
import styles from './styles.module.scss'
import Link from "next/link";
import verticalLine from "./assets/verticalLine.svg";
import {useSelector} from "react-redux";
import {userState} from "@/redux/store/user/user.slice";
import exitSvg from './assets/exit.svg'
import {useActions} from "@/redux/hooks/useActions";
import {RootState} from "@/redux/store/store";
export default function Header() {

    const user:userState = useSelector((state: RootState) => state.user);
    const {userLogOut} = useActions();
    console.log(user);

    return (
    <div className={styles.header}>
        <div className={styles.mainWrapper}>
            <h1 className={styles.logo}>FUTURE</h1>
            <nav className={styles.navigationContainer}>
                <Link className={styles.link} href={"./null"}>Ценовая политика</Link>
                <Link className={styles.link} href={"./null"}>О нас</Link>
                <Link className={styles.link} href={"./null"}>Помощь эксперта</Link>
                <Link className={styles.link} href={"./null"}>Контакты</Link>
            </nav>
            {!user.isAuth && <nav className={styles.navigationProfileContainer}>
                <Link className={styles.link} href={"./null"}>Вход</Link>
                <Image className={styles.svg} src={verticalLine} alt={"|"}/>
                <Link className={styles.link} href={"./registration"}>Регистрация</Link>
            </nav>}
            {user.isAuth && <nav className={styles.navigationProfileContainer}>
                <div className={styles.circle}>
                    <p className={styles.text}>{user.name.substring(0,2).toUpperCase()}</p>
                </div>
                <Link
                    className={styles.link}
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
