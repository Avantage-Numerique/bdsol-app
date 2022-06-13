import { useCallback, useState, useEffect } from 'react'

import { AuthContext } from '../authentication/context/auth-context'
import Layout from '../app/layouts/Layout'


/************************************
 * 
 * Import global SCSS files
 * 
 ***********************************/
import '../styles/globals.scss'  
import '../styles/normalize.scss'


function MyApp( {Component, pageProps} ) {


  //Store the session values
  const [session, setSession] = useState({
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
    setSession(newSession);

    //Store in the local storage
    localStorage.setItem('userData', JSON.stringify(newSession))

  }, [])


  const logout = useCallback(() => {

    setToken(null);
    localStorage.removeItem('userData')

  }, [])
  


  //If the page is reloaded, this hook verify if there was a token stored in the local storage. 
  //If there is one, use it to login

  useEffect(() => {

    const storedData = JSON.parse(localStorage.getItem('userData'));

    if(storedData && storedData.token){

        login(storedData.token)

    }

  },[login])

  

  return (
    
    <>

      {/* Authentication context provided to all the subsequent elements */}
      <AuthContext.Provider value={{ 

              isLoggedIn: !!session.token, 
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
