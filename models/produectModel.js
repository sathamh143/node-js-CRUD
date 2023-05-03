const mongoose = require ('mongoose');

const produectSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : [true,'please enter a product name']
        },
        quantity : {
            type : Number,
            required : true ,
            default : 0
        },
        price:{
            type : Number,
            required : true
        },
        image :{
            type : String,
            required : false 
        }
    },
    {
        timestamps : true 
    }
)

const Product = mongoose.model('product',produectSchema);

module.exports = Product ;