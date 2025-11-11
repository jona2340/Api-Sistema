const swaggerAutogen = require('swagger-autogen');

const outputFile= './swagger.json';
const endpointFiles= ['./index.js'];
const doc = {
    info:{
        title: 'Api de sistema de apis',
        info: 'Api que estra centrada en un sistema de API Rest'
    },
    schema: {
        host: 'localhost:3690',
        schemes: ['http']
    }
}

swaggerAutogen()(outputFile, endpointFiles, doc);
