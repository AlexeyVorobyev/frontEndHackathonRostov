import Image from 'next/image';
import styles from './styles.module.scss';
import Link from "next/link";
import backgroundPng from './assets/background.png';
import aboutPng from './assets/about.png';
import filialSvg from './assets/filial.svg';
import approveSvg from './assets/approve.svg';
import timeSvg from './assets/time.svg';
import locationSvg from './assets/location.svg';
import positionBuildingPng from './assets/positionBuilding.png';

export default function Landing() {
    return (
        <>
            <section className={styles.business}>
                <Image className={styles.background} src={backgroundPng} alt={""}/>
                <div className={styles.mainWrapper}>
                    <div className={styles.container}>
                        <h2 className={styles.title}>Создай <span>свой бизнес</span> с нами</h2>
                        <button className={styles.button}>
                            <p className={styles.buttonText}>Оставить заявку</p>
                        </button>
                    </div>
                    <div className={styles.grid}>
                        <div className={styles.gridElem}>
                            <p className={styles.title}>1200+</p>
                            <p className={styles.subTitle}>Открывшихся с нами ИП</p>
                        </div>
                        <div className={styles.gridElem}>
                            <p className={styles.title}>70</p>
                            <p className={styles.subTitle}>Открытых фирм</p>
                        </div>
                        <div className={styles.gridElem}>
                            <p className={styles.title}>15</p>
                            <p className={styles.subTitle}>Лет надежной работы</p>
                        </div>
                        <div className={styles.gridElem}>
                            <p className={styles.title}>350</p>
                            <p className={styles.subTitle}>Филиалов по всей стране</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.about}>
                <div className={styles.mainWrapper}>
                    <div className={styles.ellipse}/>
                    <div className={styles.container}>
                        <h2 className={styles.title}>О нас</h2>
                        <h3 className={styles.subTitle}>Работа и развитие</h3>
                        <p className={styles.paragraph}>Уже более 15 лет мы помогаем развиваться малому бизнесу в нашей стране. Мы не останавлеваемся на развитии конкретной отрасли, что позволяет молодым предпринимателям не ограничивать себя в выборе определенного направления. </p>
                        <button className={styles.button}>
                            <p className={styles.buttonText}>Узнать больше</p>
                        </button>
                    </div>
                    <div className={styles.imgContainer}>
                        <Image className={styles.img} src={aboutPng} alt={""}></Image>
                    </div>
                </div>
            </section>
            <section className={styles.position}>
                <div className={styles.mainWrapper}>
                    <div className={styles.container}>
                        <h2 className={styles.title}>Наше расположение</h2>
                        <div className={styles.cards}>
                            <div className={styles.card}>
                                <Image src={filialSvg} alt={""}/>
                                <p className={styles.paragraph}>Наши филиалы находятся на территории всей страны. Узнайте про каждый офис отдельно.</p>
                            </div>
                            <div className={styles.card}>
                                <Image src={timeSvg} alt={""}/>
                                <p className={styles.paragraph}>Для экономии вашего времени вы всегда можете связаться с нашими менеджерами по любому вопросу.</p>
                            </div>
                            <div className={styles.card}>
                                <Image src={approveSvg} alt={""}/>
                                <p className={styles.paragraph}>Мы гарантируем, что вы всегда сможете на нас положиться и доверить ваш бизнес нам.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imgContainer}>
                        <div className={styles.captionContainer}>
                            <Image src={locationSvg} alt={""}/>
                            <p className={styles.captionText}>Показать на карте</p>
                        </div>
                        <Image className={styles.img} src={positionBuildingPng} alt={""}/>
                    </div>
                </div>
            </section>
        </>
    )
}
