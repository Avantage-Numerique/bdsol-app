# Next config

Eslint is now in a package seperated.

I removed these two object from it :

```javascript
//accessible only on serveur
serverRuntimeConfig: {
    //APP CONFIG
    baseUrl: process.env.APP_BASE_URL ?? "http://localhost",
        port: process.env.APP_PORT ?? 3000,

        //ontology : This would be deprecated soon.
        apiOntologyHostName: process.env.API_ONTOLOGY_HOST_NAME,
        apiOntologyMethod: process.env.API_ONTOLOGY_METHOD,
        apiOntologyPort: process.env.API_ONTOLOGY_PORT,

        //Main API
        apiHostName: process.env.API_HOST_NAME,
        apiMethod: process.env.API_METHOD,
        apiPort: process.env.API_PORT,
        apiURL: process.env.API_HOST_NAME + ":" + process.env.API_PORT,
},
//serveur and public
publicRuntimeConfig: {
    dates: {
        defaultFormat: "YYYY-MM-DD HH:MM:SS",
            defaultLanguage: "fr-CA",
    },
    appUrl: process.env.APP_PROTOCOLE + "" + process.env.APP_BASE_URL + ":" + process.env.APP_PORT,
        pagination: {
        limit: 20,
            sort: -1,
    },
    navLoaderDelay: 300,
},
```
