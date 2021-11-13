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
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <meta name="robots" content="index, follow" />

                {/* Icone to appear on the top of the page */}
                <link rel="icon" href="icones/cropped-Frame-10-32x32.png" sizes="32x32" />
                <link rel="icon" href="icones/cropped-Frame-10-192x192.png" sizes="192x192" />
                <link rel="apple-touch-icon" href="icones/cropped-Frame-10-180x180.png" />
                <meta name="msapplication-TileImage" content="icones/cropped-Frame-10-270x270.png" />

                <meta name="theme-color" content="#000" />

                {/* General social medias meta tags */}
                <meta property="og:type"               content="website" />
                <meta property="og:image"              content="meta-images\show_screen_shot.jpg" />
                <meta property="og:image:width"        content="2560" />
                <meta property="og:image:height"       content="1345" />
                <meta property="og:locale"             content="fr_CA" />

                <meta name="twitter:card"              content="summary_large_image"/>
                <meta name="twitter:image"             content="meta-images\show_screen_shot.jpg" />
                <meta name="twitter:image:width"       content="2560" />
                <meta name="twitter:image:height"      content="1345" />
                <meta name="twitter:image:alt"         content="Public assistant à une performance qui contient des nouvelles technologies."/>


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


