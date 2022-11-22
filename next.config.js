
const path = require('path');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /*compiler: {
        removeConsole: {
            exclude: ['error', 'log', 'warn'],
        },
    },*/
    //define default value for env variables that aren't declare in the .env file or add some there.
    env: {
        //APP
        ENVIRONNEMENT: process.env.NODE_ENV ?? 'development',

        APP_PROTOCOLE: process.env.APP_PROTOCOLE ?? "http://",
        APP_BASE_URL: process.env.APP_BASE_URL ?? "localhost",
        APP_PORT: process.env.APP_PORT ?? 3000,
        APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_PROTOCOLE + process.env.APP_BASE_URL + ":" + process.env.APP_PORT,
        APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL ?? process.env.APP_PROTOCOLE + process.env.APP_BASE_URL + (process.env.APP_PORT ? ":" + process.env.APP_PORT : ""),

        //Main API
        API_HOST_NAME: process.env.API_HOST_NAME,
        API_PROTOCOLE: process.env.API_PROTOCOLE,
        API_METHOD: process.env.API_METHOD,
        API_PORT: process.env.API_PORT ?? 8000,
        API_URL: process.env.NEXT_PUBLIC_API_URL ?? process.env.API_PROTOCOLE + process.env.API_HOST_NAME + (process.env.API_PORT ? ":" + process.env.API_PORT : ""),

        FROMSERVER_APP_HOST_NAME: process.env.FROMSERVER_APP_HOST_NAME ?? 'localhost',
        FROMSERVER_APP_PROTOCOLE: process.env.FROMSERVER_APP_PROTOCOLE ?? 'http://',
        FROMSERVER_APP_METHOD: process.env.FROMSERVER_APP_METHOD ?? 'POST',
        FROMSERVER_APP_PORT: process.env.FROMSERVER_APP_PORT ?? 3000,
        FROMSERVER_APP_URL: process.env.FROMSERVER_APP_URL ?? process.env.FROMSERVER_APP_PROTOCOLE + process.env.FROMSERVER_APP_HOST_NAME + (process.env.FROMSERVER_APP_PORT ? ":" + process.env.FROMSERVER_APP_PORT : ""),

        FROMSERVER_API_HOST_NAME: process.env.FROMSERVER_API_HOST_NAME ?? 'localhost',
        FROMSERVER_API_PROTOCOLE: process.env.FROMSERVER_API_PROTOCOLE ?? 'http://',
        FROMSERVER_API_METHOD: process.env.FROMSERVER_API_METHOD ?? 'POST',
        FROMSERVER_API_PORT: process.env.FROMSERVER_API_PORT ?? 8000,
        FROMSERVER_API_URL: process.env.FROMSERVER_API_URL ?? process.env.FROMSERVER_API_PROTOCOLE + process.env.FROMSERVER_API_HOST_NAME + (process.env.FROMSERVER_API_PORT ? ":" + process.env.FROMSERVER_API_PORT : ""),

        FEEDBACK_API_KEY: process.env.FEEDBACK_API_KEY,

        LANGUAGE: process.env.LANGUAGE ?? "fr-CA",

        APP_COOKIE_NAME: process.env.APP_BASE_URL + '/bdsolAppAN',
        COOKIE_PRIVATE_KEY: process.env.COOKIE_PRIVATE_KEY ?? 'private key not set',

        PING_INTERVAL: process.env.PING_INTERVAL ?? 10000,

        //ontology : This would be deprecated soon.
        API_ONTOLOGY_HOST_NAME: process.env.API_ONTOLOGY_HOST_NAME,
        API_ONTOLOGY_METHOD: process.env.API_ONTOLOGY_METHOD,
        API_ONTOLOGY_PORT: process.env.API_ONTOLOGY_PORT
    },

    i18n: {
        locales: ["fr-CA"],
        defaultLocale: "fr-CA",
    },

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
            defaultLanguage: process.env.LANGUAGE ?? "fr-CA"
        },
        appUrl: process.env.APP_PROTOCOLE + "" + process.env.APP_BASE_URL + ":" + process.env.APP_PORT,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        additionalData: `@import "./styles/component-base-imports.scss";`,
    }
}

module.exports = nextConfig;