'use client'

import Image from 'next/image'
import styles from './styles.module.scss'
import {useSearchParams} from "next/navigation";

export default function User() {

    const searchParams = useSearchParams();
    console.log(searchParams.get('id'))

    return (
        <main>
            <p>user {searchParams.get('id')}</p>
        </main>
    )
}
