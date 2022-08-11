import { useCallback, useState, useEffect, useRef } from 'react'

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

  const storedData = useRef(null);

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

  }, [])


  const logout = useCallback(() => {

    setSession({
      isPending:  false, 
      token:      null,
      avatar:     null,
      name:       null,
      username:   null
    });
    
    localStorage.removeItem('userData')

  }, [])

  useEffect(() => {
      //This has to be inside a useEffect to let the time at the browser to charge 
      //and the local storage to be available 

      //Fill the variable with session's data
      storedData.current = JSON.parse(localStorage.getItem('userData'));

      //Verify if the user is connected of not
      if(storedData.current){
        //The user is logged in
        setSession({...session, ...storedData.current, isPending: false});
      } else {
        //The user isn't logged in
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
