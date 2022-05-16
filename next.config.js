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
        //ontology
        apiOntologyHostName: process.env.API_ONTOLOGY_HOST_NAME,
        apiOntologyMethod: process.env.API_ONTOLOGY_METHOD,
        apiOntologyPort: process.env.API_ONTOLOGY_PORT,

        //Main API
        apiHostName: process.env.API_HOST_NAME,
        apiMethod: process.env.API_METHOD,
        apiPort: process.env.API_PORT,
    },
    //serveur and public
    publicRuntimeConfig: {},
}

module.exports = nextConfig