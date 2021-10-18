/*

    General structure of a page 
    V.P.R - Created: 19-09-21

    */
import React, { useState } from "react";

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

        <div id={layoutStyles.layout}>
            <Header menuState={menuState} setMenuState={setMenuState} />
            <main> 
                { children }
            </main>
            <Footer />
        </div>

    )   

}

export default Layout;


