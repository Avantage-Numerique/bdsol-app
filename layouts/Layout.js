/*

    General structure of a page 
    V.P.R - Created: 19-09-21

    */
import Footer from '../components/Footer'
import Nav from '../components/Nav'

import layoutStyles from '../styles/layouts/Layout.module.scss'


const Layout = ( props ) => {

    return (

        <div id={layoutStyles.layout}>
            <Nav />
            <main> 
                { props.children }
            </main>
            <Footer />
        </div>

    )   

}

export default Layout;


