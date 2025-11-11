const express= require('express');

const router = express.Router();

const ProductosContorller= require("../controller/provedor.controller");

router.post("/guardarRegistro", ProductosContorller.guardar);
router.get("/listarProvedor", ProductosContorller.listarTodos);
router.get("/buscarProvedor/:id", ProductosContorller.provedorPorId);
router.delete("/eliminarProvedor/:id", ProductosContorller.provedorEliminar);
router.patch("/actualizarProvedor/:id", ProductosContorller.provedorActualizar);

module.exports= router;