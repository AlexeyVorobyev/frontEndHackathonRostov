import Image from 'next/image'
import styles from './page.module.scss'
import Link from "next/link";

export default function Landing() {
  return (
    <main>
        <Link href={'./template'}>ToTemplate</Link>
        <Link href={'./registration'}>ToRegistr</Link>
    </main>
  )
}
