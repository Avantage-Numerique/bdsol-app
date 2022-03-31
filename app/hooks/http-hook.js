
import { useState, useCallback, useRef, useEffect } from 'react';




//Main hook function called for every request made to the database
export const useHttpClient = () => {

  //State that determine if the request is in progress
  const [isLoading, setIsLoading] = useState(false);

  //State that register the current error status
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);


  const sendRequest = useCallback(

    //Main request function with pre-determined values
    async (url, method = 'GET', body = null, headers = {}) => {

      setIsLoading(true); 

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {

        /*
            Use the fetch requestion with the url (required) and with its options object filled with the full data that we want to pass, if so. 
        */
        const response = await fetch(url, {
          method,                                   //Get by default
          body,                                     //Data
          headers,                                  //Container the token, if there is one
          signal: httpAbortCtrl.signal              //
        });

        const responseData = await response.json();

        //Remove the abort controler now that the response has been received
        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );

        //Make sure the response is valid
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        //The operation is done so we can now remove the loading state
        setIsLoading(false);

        //Return the data
        return responseData;

      } catch (err) {

        console.log(err)
        //Update the state with the error message
        setError(err.message);

        //Remove the loading state
        setIsLoading(false);

        //Pass the error
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};