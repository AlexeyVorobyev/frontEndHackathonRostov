import Image from 'next/image'
import styles from './styles.module.scss'
import Link from "next/link";
import verticalLine from "./assets/verticalLine.svg";

export default function Header() {
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
            <nav className={styles.navigationProfileContainer}>
                <Link className={styles.link} href={"./null"}>Вход</Link>
                <Image className={styles.svg} src={verticalLine} alt={"|"}/>
                <Link className={styles.link} href={"./registration"}>Регистрация</Link>
            </nav>
        </div>
    </div>
  )
}
