import React from "react";
import styles from './styles.module.scss'
import alex from './assets/alex.png'
import niki from './assets/niki.png'
import vano from './assets/vano.png'
import sofia from './assets/sofia.png'
import kitkat from './assets/kitkat.png'
import nastyapotap from './assets/nastyapotap.jpg'
import kotya from './assets/kotya.jpg'
import tiger from './assets/tiger.jpg'
import Image from "next/image";
export const Contacts = () => {
    return (
        <section className={styles.contactsSection}>
            <p className={styles.contactsHeader}>Команда AVENIR</p>
            <div className={styles.contactsFlex}>
                {/*<div className={styles.background}/>*/}
                <div className={styles.contactsCard}>
                    <div className={styles.cardImgContainer}>
                        <Image className={styles.cardImg} src={alex} alt={""}/>
                    </div>
                    <p className={styles.cardName}>Алексей Воробьев</p>
                    <p className={styles.cardProfession}>Frontend разработчик</p>
                    <a href={"https://t.me/Kurt_Alexis_23"} className={styles.cardLink}>@Kurt_Alexis_23</a>
                    <p className={styles.cardStack}>Технологический стек: Next.js, React, RTK</p>
                </div>
                <div className={styles.contactsCard}>
                    <div className={styles.cardImgContainer}>
                        <Image className={styles.cardImg} src={niki} alt={""}/>
                    </div>
                    <p className={styles.cardName}>Никита Волошин</p>
                    <p className={styles.cardProfession}>Backend разработчик</p>
                    <a href={"https://t.me/nikitaVoV"} className={styles.cardLink}>@nikitaVoV</a>
                    <p className={styles.cardStack}>Технологический стек: Java Spring, Postgres</p>
                </div>
                <div className={styles.contactsCard}>
                    <div className={styles.cardImgContainer}>
                        <Image className={styles.cardImg} src={vano} alt={""}/>
                    </div>
                    <p className={styles.cardName}>Иван Головачев</p>
                    <p className={styles.cardProfession}>Проджект менеджер</p>
                    <a href={"https://t.me/skoro0977"} className={styles.cardLink}>@skoro0977</a>
                </div>
                <div className={styles.contactsCard}>
                    <div className={styles.cardImgContainer}>
                        <Image className={styles.cardImg} src={sofia} alt={""}/>
                    </div>
                    <p className={styles.cardName}>Софья Коновалова</p>
                    <p className={styles.cardProfession}>UI/UX designer</p>
                    <a href={"https://t.me/art3midas"} className={styles.cardLink}>@art3midas</a>
                </div>
                <div className={styles.contactsCard}>
                    <div className={styles.cardImgContainer}>
                        <Image className={styles.cardImg} src={kitkat} alt={""}/>
                    </div>
                    <p className={styles.cardName}>Екатерина Мочалова</p>
                    <p className={styles.cardProfession}>Аналитик</p>
                    <a href={"https://t.me/katerina_makone"} className={styles.cardLink}>@katerina_makone</a>
                </div>
                <div className={styles.contactsCard}>
                    <div className={styles.cardImgContainer}>
                        <Image className={styles.cardImg} src={nastyapotap} alt={""}/>
                    </div>
                    <p className={styles.cardName}>Анастасия Кулягина</p>
                    <p className={styles.cardProfession}>Mobile разработчик</p>
                    <a href={"https://t.me/kuanpa"} className={styles.cardLink}>@kuanpa</a>
                    <p className={styles.cardStack}>Технологический стек: React Native</p>
                </div>
                <div className={styles.contactsCard}>
                    <div className={styles.cardImgContainer}>
                        <Image className={styles.cardImg} src={kotya} alt={""}/>
                    </div>
                    <p className={styles.cardName}>Костя <br/>Комит</p>
                    <p className={styles.cardProfession}>UI/UX designer</p>
                    <a href={"https://t.me/ayokamit"} className={styles.cardLink}>@ayokamit</a>
                </div>
                <div className={styles.contactsCard}>
                    <div className={styles.cardImgContainer}>
                        <Image className={styles.cardImg} src={tiger} alt={""}/>
                    </div>
                    <p className={styles.cardName}>Тигран Айрапетов</p>
                    <p className={styles.cardProfession}>Backend разработчик</p>
                    <a href={"https://t.me/abyss_of_nothingness"} className={styles.cardLink}>@abyss_of_nothingness</a>
                    <p  className={styles.cardStack}>Технологический стек: Java Spring, Postgres</p>
                </div>
            </div>
        </section>
    )
}
