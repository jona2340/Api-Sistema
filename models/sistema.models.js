const {Schema, model, Types} = require("mongoose");
const {trim , default: _default}= require("validator")

const sistemaSchema= new Schema({
    nombreProducto:{
        type: String,
        require: true,
        trim: true
    },
    precio:{
        type: Number,
        require: true,
    },
    descripcion:{
        type: String,
        require: false,
    },
    fechaCaducidad:{
        type: Date,
        require: true,
    },
    fechaCompra:{
        type: Date,
        default:Date.now
    },
    stock:{
        type: Number,
        require: true
    },
    imagen:{
        type: String,
        default: "imagen-del-producto"
    },
        provedor: {
        type: Schema.Types.ObjectId, 
        ref: 'provedorSchema' 
    }

});

module.exports= model(
    "Sistema",
    sistemaSchema,
    "Sistema-Productos"
)