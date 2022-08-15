import { useCallback, useState, useEffect } from 'react'

import { AuthContext } from '../authentication/context/auth-context'
import Layout from '../app/layouts/Layout'
import NamedRoutes from "../app/utils/NamedRoutes";

/************************************
 * 
 * Import global SCSS files
 * 
 ***********************************/
import '../styles/main.scss'



const routeManager = new NamedRoutes();
const routes = {
    "about": {
        pathname: '/a-propos'
    }
}

for (let routeName in routes) {
    routeManager.addRoute(routeName, routes[routeName]);
}

function MyApp( {Component, pageProps} ) {

  //Store the session values
  const [session, setSession] = useState({
      isPending: true,                        //Tells the frontend that the localStorage has not been consulted yet
      token: false,
      avatar: null,
      name: null,
      username: null
  });

  /*
  *
    Functions to modify the authentication context 
  *
  */

  const login = useCallback(userData => {
    
    const newSession = {
      token:      userData.token,     //There must be at least a token, for now
      avatar:     userData.avatar ? userData.avatar : null,
      name:       userData.name ? userData.name : null,
      username:   userData.username ? userData.username : null
    }

    //Update the state
    setSession({...session, ...newSession});

    //Store in the local storage
    localStorage.setItem('userData', JSON.stringify(newSession))

  }, [session])

  const logout = useCallback(() => {
    
    localStorage.removeItem('userData')

    setSession({
      ...session,
      token:      null,
      avatar:     null,
      name:       null,
      username:   null
    });

  }, [session])

  /*
  *
     Consult the localStorage to see of the user is connected and remove the pending state
  *
  */
  useEffect(() => {
      //This has to be inside a useEffect to let the time at the browser to charge 
      //and the local storage to be available 

      //Fill the variable with session's data
      const storedData = JSON.parse(localStorage.getItem('userData'));

      //Verify if there is data in the storedata
      if(storedData){
        //Then save the data into the state
        setSession({...session, ...storedData, isPending: false});
      } else {
        //These is nothing but it has been evaluate so we need to change the pending state 
        setSession({...session, isPending: false});
      }
  }, [])

  return (
    
    <>

      {/* Authentication context provided to all the subsequent elements */}
      <AuthContext.Provider value={{ 

              isPending: session.isPending,
              isLoggedIn: session && session.token, 
              token: session.token,
              avatar: session.avatar,
              name: session.name,
              username: session.username,
              login: login, 
              logout: logout
      
      }}>

            <Layout>
                
                <Component {...pageProps} />
              
            </Layout>
            
      </AuthContext.Provider>

    </>
  )
  
}

export default MyApp
