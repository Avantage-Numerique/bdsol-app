/**
 *
 * @type {{apiMethod: *, apiOntologyPort: *, apiPort: *, apiOntologyHostName: *, apiOntologyMethod: *, apiHostName: *}}
 */
const Config = {
    //ontology
    'apiOntologyHostName': process.env.API_ONTOLOGY_HOST_NAME,
    'apiOntologyMethod': process.env.API_ONTOLOGY_METHOD,
    'apiOntologyPort': process.env.API_ONTOLOGY_PORT,

    //Main API
    'apiHostName': process.env.API_HOST_NAME,
    'apiMethod': process.env.API_METHOD,
    'apiPort': process.env.API_PORT,
};

export default Config;