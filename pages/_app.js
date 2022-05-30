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


  //If we have a token, then it means that we are logged in
  const [token, setToken] = useState( false ); 

  //Functions to modify the context
  const login = useCallback(token => {
    setToken(token);
    localStorage.setItem('userData', JSON.stringify({token: token}))
  }, [])

  const logout = useCallback(() => {
    setToken(null);
  }, [])

  useEffect(() => {
    console.log(token)

  },[token])

  return (
    
    <>
      {/* Authentication context provided to all the subsequents elements */}
      <AuthContext.Provider value={{ 
        isLoggedIn: !!token, 
        token: token,
        login: login, 
        logout: logout }}>
          <Layout>

              <Component {...pageProps} />

          </Layout>
      </AuthContext.Provider>
    </>
  )
  
}

export default MyApp
