/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        }
        return config
    },
    env: {
        APP_BASE_URL: process.env.APP_BASE_URL ?? "http://localhost",
        APP_PORT: process.env.APP_PORT ?? 3000,
        APP_URL: process.env.APP_BASE_URL + ":" + process.env.APP_PORT,

        //ontology : This would be deprecated soon.
        API_ONTOLOGY_HOST_NAME: process.env.API_ONTOLOGY_HOST_NAME,
        API_ONTOLOGY_METHOD: process.env.API_ONTOLOGY_METHOD,
        API_ONTOLOGY_PORT: process.env.API_ONTOLOGY_PORT,

        //Main API
        API_HOST_NAME: process.env.API_HOST_NAME,
        API_METHOD: process.env.API_METHOD,
        API_PORT: process.env.API_PORT,
        API_URL: process.env.API_HOST_NAME + ":" + process.env.API_PORT,
    },
    //accessible only on serveur
    serverRuntimeConfig: {

        //APP CONFIG
        baseUrl: process.env.APP_BASE_URL ?? "http://localhost",
        port: process.env.APP_PORT ?? 3000,
        appUrl: process.env.APP_BASE_URL + ":" + process.env.APP_PORT,

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
        /*//APP CONFIG
        baseUrl: process.env.APP_BASE_URL ?? "http://localhost",
        port: process.env.APP_PORT ?? 3000,
        appUrl: process.env.APP_BASE_URL + ":" + process.env.APP_PORT,
        //Main API
        apiHostName: process.env.API_HOST_NAME,
        apiMethod: process.env.API_METHOD,
        apiPort: process.env.API_PORT,
        apiURL: process.env.API_HOST_NAME + ":" + process.env.API_PORT,*/
    },
}

module.exports = nextConfig