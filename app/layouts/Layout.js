/*

    General structure of a page 
    V.P.R - Created: 19-09-21

    */
import React, { useState } from "react";

import Head from 'next/head'

import Footer from './Footer/Footer'
import Header from './Header/Header'
import Nav from './Navigation/MainNav/Nav'
import AccountNav from './Navigation/AccountNav/AccountNav'

import layoutStyles from './Layout.module.scss'


const Layout = ( {children} ) => {

    /*
        State manager to manage the situation of the two menus. (Main menu and  account menu)
        Listen in the header component and update in the nav component.

        Three menu states possible : 
        0 : close
        1 : Main menu open
        2 : Account menu open
    */
    const [menuState, setMenuState] = useState(0);

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

                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
 
            
            </Head>

            <div id={layoutStyles.layout}>
                <Header menuState={menuState} setMenuState={setMenuState} />
                <Nav menuState={menuState} setMenuState={setMenuState} />
                <AccountNav menuState={menuState} setMenuState={setMenuState} />
                <main> 
                    { children }
                </main>
                <Footer />
            </div>
        </>
    )   

}

export default Layout;


