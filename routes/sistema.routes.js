const express= require('express');

const router = express.Router();

const ProductosContorller= require("../controller/sistema.controller");

router.post("/guardarRegistro", ProductosContorller.guardar);
router.get("/listarSistema", ProductosContorller.listarTodos);
router.get("/buscarSistema/:id", ProductosContorller.SistemaPorId);
router.delete("/eliminarSistema/:id", ProductosContorller.SistemaEliminar);
router.patch("/actualizarSistema/:id", ProductosContorller.SistemaActualizar);

module.exports= router;