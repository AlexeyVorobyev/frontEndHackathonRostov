import Image from 'next/image'
import styles from './styles.module.scss'
import Link from "next/link";
import phoneSvg from './assets/phone.svg'
import telegramSvg from './assets/telegram.svg'
import mailSvg from './assets/mail.svg'
import instagramSvg from './assets/instagram.svg'

export default function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.mainWrapper}>
            <h2 className={styles.logo}>FUTURE</h2>
            <nav className={styles.navigationContainer}>
                <div className={styles.navigationSubContainer}>
                    <Link className={styles.link} href={"./null"}>О нас</Link>
                    <Link className={styles.link} href={"./null"}>Наши Услуги</Link>
                    <Link className={styles.link} href={"./null"}>Вакансии</Link>
                </div>
                <div className={styles.navigationSubContainer}>
                    <Link className={styles.link} href={"./null"}>Новости</Link>
                    <Link className={styles.link} href={"./null"}>Поддержка</Link>
                    <Link className={styles.link} href={"./null"}>Контакты</Link>
                </div>
            </nav>

            <div className={styles.contactsContainer}>
                <div className={styles.iconsContainer}>
                    <Image className={styles.icon} src={phoneSvg} alt={"phone"}/>
                    <Image className={styles.icon} src={telegramSvg} alt={"telegram"}/>
                    <Image className={styles.icon} src={mailSvg} alt={"mail"}/>
                    <Image className={styles.icon} src={instagramSvg} alt={"instagram"}/>
                </div>
                <button className={styles.button}>
                    <p className={styles.buttonText}>Оставить заявку</p>
                </button>
            </div>
        </div>
    </div>
  )
}
