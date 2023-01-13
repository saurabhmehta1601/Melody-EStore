import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

interface IProps {
    children: React.ReactNode
}

const Layout = ({ children }: IProps) => {
    return (
        <div className='layout'>
            <Head>
                <title> EStore</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className='main-container'>
                {children}
            </main>
            <footer><Footer /></footer>
        </div>
    )
}

export default Layout