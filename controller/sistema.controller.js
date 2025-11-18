//1.- importar el modelo que vamos a ocupar en este controlador
const Sistema = require('../models/sistema.models');
const Provedor = require('../models/provedor.models');

//2.- Crear metodos (acciones que hara el controlador)
    //guardarRegistro
    const guardar = async(req, res)=>{
       /** */ try {
            //1.- Recibir los datos
            const {nombreProducto, precio, fechaCaducidad, stock,imagen, provedor }= req.body;
            //2.-Validar datos obligatorios
            if (!nombreProducto || !fechaCaducidad || !precio) {
                res.status(400).json({
                    status: "Error",
                    message: "Los campos 'nombreProducto, precio, fechaCaducidad, stock' son obligatorios"
                })
            }

            if (provedor) { // Solo si se proporciona un ID de grupo
            const provedorEncontrado = await Provedor.findById(provedor);
            if (!provedorEncontrado) {
                return res.status(404).json({
                    status: "Error",
                    message: "No se encontró el proveedor con el ID proporcionado"
                });
            }
        }

            //3.-Crear objeto usando el modelo
            const  nuevoProducto= new Sistema({
                nombreProducto,
                precio: precio ,
                fechaCaducidad,
                stock: stock || 0,
                imagen,
                provedor: provedor
            })

            //4.-Guardar ese objeto en la base de datos
            const productoGuardado= await nuevoProducto.save();
            //5.-Devolver una respueta
            return res.status(201).json({
                status: "success",
                message: "Producto guardado correctamente",
                data: productoGuardado
            })

        

        } catch (error) {
            console.log("ERROR al guardar Producto", error);
            return res.status(500).json({
                status: "error",
                message: "Error del servidor",
                error: error.message
            });
        }
    };
    //obtener todos
    const listarTodos = async (req, res)=>{
        try {
           //1.- obtener datos de la BD 
        const ConciertoBD = await Sistema.find({}).populate("provedor");
           //2.- Responder
        return res.status(200).json({
            status: "success",
            message: "Todos los conciertos almacenados en BD",
            data:ConciertoBD
            })

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Error del servidor",
                error: error.message
            });
        }

    } 
    //obtenerPorID
    const SistemaPorId = async (req, res)=>{
        try {
          //1.- Recoger el parametro de la URL
        const id= req.params.id;
        
          //2.- Buscar ese id en la BD
        const productoBuscado= await Sistema.findById(id).populate("provedor");

          //3.- si no existe, responder 404
        if (!productoBuscado) {
            return res.status(404).json({
                status: "error ",
                message: "Producto no encontrado en la BD"
            })
        }

          //4.- si si existe, responder ok 200
        return res.status(200).json({
            status: 'succes',
            message: "Producto encontrado en la BD",
            data: productoBuscado
        })

        } catch (error) {
            console.log("Error al encontrar producto", error);
            return res.status(500).json({
                status: "error",
                message: "Error del servidor",
                error: error.message
            });
        }
    }
    //eliminar
    const SistemaEliminar= async(req, res)=>{
        try {
            //1- recoger parametro id de la URL
            const id= req.params.id;
            
            //2.-Busascar, eliminar y obtener el documento eliminado
            const productoEliminado = await Sistema.findByIdAndDelete(id).lean();

            //si no exites, responder un 404
            if (!productoEliminado) {
                return res.status(404).json({
                    status: "error",
                    message: "Producto no encontrado"
                })
            }

            //4.- si si exite responder ok
            return res.status(200).json({
                status: "succes",
                message: "Producto eliminado correctamente",
                data: productoEliminado
            })
        } catch (error) {
            console.log("Error al eliminar producto", error);
            return res.status(500).json({
                status: "error",
                message: 
                "Error del servidor",
                error: error.message
            });
        }
    }
    //actualizar
    const SistemaActualizar = async(req, res)=>{
        try {
            //1.-recoger el paramentro id de la URL
            const id = req.params.id;

            //2.- Recibir los datos a actualizar desde el body
            const {nombreProducto, precio, fechaCaducidad, stock, imagen, provedor}= req.body;

            //3.- Validar que almenos un campo venga para actualizar
            if (!nombreProducto && !precio && !fechaCaducidad && !stock && !imagen && !provedor ) {
                return res.satus(400).json({
                    status: "error",
                    message: "Debe proporcionar almenos un campo para actualizar"
                })
            } 
            //4.- Crear un objeto con solo los campos que viene en la solicitud o en el body
            const datosActualizar= {};
            if (nombreProducto) datosActualizar.nombreProducto = nombreProducto;
            if (precio) datosActualizar.precio = precio;
            if (fechaCaducidad) datosActualizar.fechaCaducidad = fechaCaducidad;
            if (stock !== undefined) datosActualizar.stock = stock;
            if (imagen) datosActualizar.imagen = imagen;
            if (provedor) datosActualizar.provedor = provedor;

            //5.- Buscar y actualizar el resgistro en la BD
            const productoAcutualizado = await Sistema.findByIdAndUpdate(id, datosActualizar,{
                new: true, // Devolver el documento actualizado
                runValidators: true //Ejecuta las validadciones del Schema

            })
            //6.- Si no existe el proyecto responder un 404
            if (!productoAcutualizado) {
                return res.satus(404).json({
                    satus: "error",
                    message: "Producto no encontrado"
                })
            }

                if (productoAcutualizado.provedor) {
                await Provedor.findByIdAndUpdate(productoAcutualizado.provedor, {
                    $pull: { provedor: productoAcutualizado.provedor }
                });
            }

            //7.- Si existe el proyecto y si lo actualizazo, responder con un 200 ok
            return res.status(200).json({
                status: "succes",
                message: "Producto actualizado correctamente",
                data: productoAcutualizado
            })


        } catch (error) {
            console.log("Error al actualizar producto", error);
            return res.status(500).json({
                status: "error",
                message: 
                "Error del servidor",
                error: error.message
            });
        }
    }
//3.-Exportar los metodos
module.exports={
    guardar,
    listarTodos,
    SistemaPorId,
    SistemaEliminar,
    SistemaActualizar
}