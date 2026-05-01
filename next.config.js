const path = require("path");

//Cookie name for cookies choices is : avnuCookies

/**
 * @typedef {Object} PublicRuntimeConfig
 *
 * @property {{ defaultFormat: string, defaultLanguage: string }} dates
 * @property {string} appUrl
 * @property {{ limit: number, sort: number }} pagination
 * @property {number} navLoaderDelay delay before triggering loading animation on navigation (in ms)
 */

/**
 * @type {import('next').NextConfig & { publicRuntimeConfig: PublicRuntimeConfig }}
 */
const nextConfig = {
    /*experimental: {
        // This is experimental but can
        // be enabled to allow parallel threads
        // with nextjs automatic static generation
        workerThreads: false,
        cpus: 1
    },*/
    //define default value for env variables that aren't declare in the .env file or add some there.
    env: {
        //APP
        MODE: process.env.MODE ?? "full",
        VERSION: process.env.VERSION ?? "0.0.0",
        ENVIRONNEMENT: process.env.NODE_ENV ?? "development",

        NEXT_PUBLIC_MATOMO_URL: process.env.NEXT_PUBLIC_MATOMO_URL,
        NEXT_PUBLIC_MATOMO_SITE_ID: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,

        APP_PROTOCOLE: process.env.APP_PROTOCOLE ?? "http://",
        APP_BASE_URL: process.env.APP_BASE_URL ?? "localhost",
        APP_PORT: process.env.APP_PORT ?? 3000,
        APP_URL:
            process.env.NEXT_PUBLIC_APP_URL ??
            process.env.APP_PROTOCOLE +
                process.env.APP_BASE_URL +
                ":" +
                (process.env.APP_PORT ? ":" + process.env.APP_PORT : ""),
        APP_API_URL:
            process.env.NEXT_PUBLIC_APP_API_URL ??
            process.env.APP_PROTOCOLE +
                process.env.APP_BASE_URL +
                (process.env.APP_PORT ? ":" + process.env.APP_PORT : ""),

        //Main API
        API_HOST_NAME: process.env.API_HOST_NAME,
        API_PROTOCOLE: process.env.API_PROTOCOLE,
        API_METHOD: process.env.API_METHOD,
        API_PORT: process.env.API_PORT ?? 8000,
        API_URL:
            process.env.NEXT_PUBLIC_API_URL ??
            process.env.API_PROTOCOLE +
                process.env.API_HOST_NAME +
                (process.env.API_PORT ? ":" + process.env.API_PORT : ""),

        FROMSERVER_APP_HOST_NAME: process.env.FROMSERVER_APP_HOST_NAME ?? "localhost",
        FROMSERVER_APP_PROTOCOLE: process.env.FROMSERVER_APP_PROTOCOLE ?? "http://",
        FROMSERVER_APP_METHOD: process.env.FROMSERVER_APP_METHOD ?? "POST",
        FROMSERVER_APP_PORT: process.env.FROMSERVER_APP_PORT ?? 3000,
        FROMSERVER_APP_URL:
            process.env.FROMSERVER_APP_URL ??
            process.env.FROMSERVER_APP_PROTOCOLE +
                process.env.FROMSERVER_APP_HOST_NAME +
                (process.env.FROMSERVER_APP_PORT ? ":" + process.env.FROMSERVER_APP_PORT : ""),

        FROMSERVER_API_HOST_NAME: process.env.FROMSERVER_API_HOST_NAME ?? "localhost",
        FROMSERVER_API_PROTOCOLE: process.env.FROMSERVER_API_PROTOCOLE ?? "http://",
        FROMSERVER_API_METHOD: process.env.FROMSERVER_API_METHOD ?? "POST",
        FROMSERVER_API_PORT: process.env.FROMSERVER_API_PORT ?? 8000,
        FROMSERVER_API_URL:
            process.env.FROMSERVER_API_URL ??
            process.env.FROMSERVER_API_PROTOCOLE +
                process.env.FROMSERVER_API_HOST_NAME +
                (process.env.FROMSERVER_API_PORT ? ":" + process.env.FROMSERVER_API_PORT : ""),

        FEEDBACK_API_KEY: process.env.FEEDBACK_API_KEY,

        LANGUAGE: process.env.LANGUAGE ?? "fr-CA",

        APP_COOKIE_NAME: "avnuConnection",
        COOKIE_PRIVATE_KEY:
            process.env.COOKIE_PRIVATE_KEY ?? "This should be changed, the private key is not set yet !",
        COOKIE_MAX_AGE: process.env.COOKIE_MAX_AGE ?? "86600",

        PING_INTERVAL: process.env.PING_INTERVAL ?? "5", //in minutes

        //ontology : This would be deprecated soon.
        API_ONTOLOGY_HOST_NAME: process.env.API_ONTOLOGY_HOST_NAME,
        API_ONTOLOGY_METHOD: process.env.API_ONTOLOGY_METHOD,
        API_ONTOLOGY_PORT: process.env.API_ONTOLOGY_PORT,
    },

    i18n: {
        locales: ["fr-CA"],
        defaultLocale: "fr-CA",
    },

    sassOptions: {
        loadPaths: [
            "styles",
            "node_modules",
            "node_modules/bootstrap/scss",
            "node_modules/line-awesome/dist/line-awesome/scss",
        ],
        additionalData: `@use "./abstracts" as *;`,
    },
    experimental: { esmExternals: true },
};

module.exports = nextConfig;
