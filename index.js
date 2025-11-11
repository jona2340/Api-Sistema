const express = require("express");
const cors = require("cors");
const conection= require('./database/conection');
const { default: mongoose } = require("mongoose");
const swaggerUI = require('swagger-ui-express');
const swaggerDocumentation = require('./swagger.json'); 

    conection();
    
    const SistemaRoutes = require("./routes/sistema.routes")
    const ProvedorRoutes = require("./routes/provedor.routes")

    const{version} = require ('mongoose');
    const app= express();
    const PORT= 3690;

    app.use(cors());
    app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
    app.use(express.json());
    app.use(express.urlencoded(
        {
            extended: true
        }
    ));

    app.use("/api/v1/Sistema", SistemaRoutes);
    app.use("/api/v1/Provedor", ProvedorRoutes);

    app.listen (PORT, () => {
    console.log(`El server is running on http://localhost:${PORT}`);
    })