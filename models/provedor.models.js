const {Schema, model, Types} = require("mongoose");
const {trim , default: _default}= require("validator")

const provedorSchema= new Schema({
    nombrProvedor:{
        type: String,
        require: true,
        trim: true
    },
    precio:{
        type: Number,
        require: true,
    }

});

module.exports= model(
    "provedorSchema",
    provedorSchema,
    "provedorSchema"
)