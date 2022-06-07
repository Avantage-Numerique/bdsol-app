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

    //accessible only on serveur
    serverRuntimeConfig: {

        //APP CONFIG
        baseUrl: process.env.APP_BASE_URL ?? "https://localhost",
        port: process.env.APP_PORT ?? 3000,
        appUrl: process.env.APP_BASE_URL + ":"+process.env.APP_PORT,

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
    publicRuntimeConfig: {},
}

module.exports = nextConfig