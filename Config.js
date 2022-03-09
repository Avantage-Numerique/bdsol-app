/**
 *
 * @type {{apiBaseMethod: string, apiBaseHostName: string, apiBasePort: number}}
 */
const Config = {
    'apiBaseHostName': process.env.API_BASE_HOST_NAME,
    'apiBaseMethod': process.env.API_BASE_METHOD,
    'apiBasePort': process.env.API_BASE_PORT,
};

export default Config;