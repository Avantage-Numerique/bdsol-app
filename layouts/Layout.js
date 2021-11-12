/*

    General structure of a page 
    V.P.R - Created: 19-09-21

    */
import React, { useState } from "react";

import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Nav from '../components/Nav'


import layoutStyles from '../styles/layouts/Layout.module.scss'


const Layout = ( {children} ) => {

    /*
        State manager to manage the situation of the menu : is it displayed or not. 
        Listen in the header component and update in the nav component.

        By default, the value is false, which means the menu is closed
    */
    const [menuState, setMenuState] = useState(false);



    return (

        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                <meta name="robots" content="index, follow" />

                {/* Icone to appear on the top of the page */}
                <link rel="icon" href="icones/cropped-Frame-10-32x32.png" sizes="32x32" />
                <link rel="icon" href="icones/cropped-Frame-10-192x192.png" sizes="192x192" />
                <link rel="apple-touch-icon" href="icones/cropped-Frame-10-180x180.png" />
                <meta name="msapplication-TileImage" content="icones/cropped-Frame-10-270x270.png" />

            </Head>

            <div id={layoutStyles.layout}>
                <Header menuState={menuState} setMenuState={setMenuState} />
                <Nav menuState={menuState} setMenuState={setMenuState} />
                <main> 
                    { children }
                </main>
                <Footer />
            </div>
        </>
    )   

}

export default Layout;


