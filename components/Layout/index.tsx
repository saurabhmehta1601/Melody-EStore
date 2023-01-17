import Head from 'next/head'
import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'
import styles from "./styles.module.css"

interface IProps {
    children: React.ReactNode
}

const Layout = ({ children }: IProps) => {
    return (
        <div className={['layout', styles.layoutContainer].join(" ")}>
            <Head>
                <title> Melody EStore </title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className={['main-container', styles.mainContainer].join(" ")}>
                {children}
            </main>
            <footer className={styles.footerContainer}><Footer /></footer>
        </div>
    )
}

export default Layout