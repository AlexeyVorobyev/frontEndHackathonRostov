'use client'

import Image from 'next/image'
import styles from './styles.module.scss'
import {useSearchParams} from "next/navigation";

export default function Route() {

    const searchParams = useSearchParams();
    console.log(searchParams.get('id'))

    return (
        <main>
            <p>route {searchParams.get('id')}</p>
        </main>
    )
}
