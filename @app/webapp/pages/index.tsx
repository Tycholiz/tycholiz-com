import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Home } from '../components/home'
import { DefaultTemplate } from '../components/templates'
import { Header } from '../components/common'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kyle Tycholiz</title>
        <meta name="description" content="Personal website of Kyle Tycholiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultTemplate
        header={<Header />}
        // footer={<Footer />}
      >
        <Home />
      </DefaultTemplate>
    </>
  )
}

export default HomePage
