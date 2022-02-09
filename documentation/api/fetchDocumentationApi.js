//Function to fetch the documentation api and return the data

/*


    This section is not imported yet and is only in developpement
    V.P.R - 9/02/2022


*/
export const fetchDocumentationApi = async () => {

    try {
        const res = await fetch(Config.apiBaseHostName);
        const data = await res.json();
    
        return data;
    } catch(error){

        //Do something if there is a problem with the request
        console.error(error);
    }
    
}