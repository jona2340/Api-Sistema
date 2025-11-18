const express = require("express");
const cors = require("cors");
const conection = require('./database/conection');
const { default: mongoose } = require("mongoose");

const { apiReference } = require('@scalar/express-api-reference'); 
const path = require('path'); 


conection();


const SistemaRoutes = require("./routes/sistema.routes");
const ProvedorRoutes = require("./routes/provedor.routes");

const { version } = require('mongoose'); 
const app = express();
const PORT = 3690;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded(
    {
        extended: true
    }
));


app.use("/api/v1/Sistema", SistemaRoutes);
app.use("/api/v1/Provedor", ProvedorRoutes);


app.get('/swagger_output.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'swagger_output.json'));
});


app.use(
    '/documentacion', // URL: http://localhost:3690/documentacion
    apiReference({
        url: '/swagger_output.json', 
        theme: 'purple', 
        pageTitle: 'Documentación de API REST',
    }),
);

app.listen(PORT, () => {
    console.log(`El server is running on http://localhost:${PORT}`);
    console.log(`La documentación de Scalar está en http://localhost:${PORT}/documentacion`);
});