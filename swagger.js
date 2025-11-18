const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Documentación API de Proveedores y Sistema',
        description: 'Documentación generada automáticamente para la API de gestión de proveedores y sistema.',
    },
    host: 'localhost:3690', 
    schemes: ['http'], 
    tags: [
        {
            name: 'Sistema',
            description: 'Endpoints relacionados con la configuración del sistema.',
        },
        {
            name: 'Provedor',
            description: 'Endpoints para la gestión de proveedores.',
        },
    ],

};


const outputFile = './swagger_output.json';


const endpointsFiles = [
    './index.js',
    './routes/sistema.routes.js', 
    './routes/provedor.routes.js'
];

// Ejecutar swaggerAutogen
swaggerAutogen(outputFile, endpointsFiles, doc);