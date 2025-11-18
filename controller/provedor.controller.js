const Provedor = require('../models/provedor.models');

//2.- Crear metodos (acciones que hara el controlador)
    //guardarRegistro
    const guardar = async(req, res)=>{
       /** */ try {
            //1.- Recibir los datos
            const {nombrProvedor, precio}= req.body;
            //2.-Validar datos obligatorios
            if (!nombrProvedor || !precio) {
                res.status(400).json({
                    status: "Error",
                    message: "Los campos 'nombreProducto, precio, fechaCaducidad, stock' son obligatorios"
                })
            }

            //3.-Crear objeto usando el modelo
            const  nuevoProvedor= new Provedor({
                nombrProvedor,
                precio: precio || 0,
            })

            //4.-Guardar ese objeto en la base de datos
            const productoGuardado= await nuevoProvedor.save();
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
        const productosBD = await Provedor.find();
           //2.- Responder
        return res.status(200).json({
            status: "success",
            message: "Todos los productos almacenados en BD",
            data:productosBD

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
    const provedorPorId = async (req, res)=>{
        try {
          //1.- Recoger el parametro de la URL
        const id= req.params.id;
        
          //2.- Buscar ese id en la BD
        const productoBuscado= await Provedor.findById(id);

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
    const provedorEliminar= async(req, res)=>{
        try {
            //1- recoger parametro id de la URL
            const id= req.params.id;
            
            //2.-Busascar, eliminar y obtener el documento eliminado
            const productoEliminado = await Provedor.findByIdAndDelete(id).lean();

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
    const provedorActualizar = async(req, res)=>{
        try {
            //1.-recoger el paramentro id de la URL
            const id = req.params.id;

            //2.- Recibir los datos a actualizar desde el body
            const {nombrProvedor, precio}= req.body;

            //3.- Validar que almenos un campo venga para actualizar
            if (!nombrProvedor && !precio ) {
                return res.satus(400).json({
                    status: "error",
                    message: "Debe proporcionar almenos un campo para actualizar"
                })
            } 
            //4.- Crear un objeto con solo los campos que viene en la solicitud o en el body
            const datosActualizar= {};
            if (nombrProvedor) datosActualizar.nombrProvedor = nombrProvedor;
            if (precio) datosActualizar.precio = precio;

            //5.- Buscar y actualizar el resgistro en la BD
            const productoAcutualizado = await Provedor.findByIdAndUpdate(id, datosActualizar,{
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
    provedorPorId,
    provedorEliminar,
    provedorActualizar
}