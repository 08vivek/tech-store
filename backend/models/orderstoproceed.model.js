const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    user: {type:Object,required:true},
    products: {type: Array, required: true},
    total: {type: Number,required: true}
},{timestamps: true});

const Orders = mongoose.model('Orders',ordersSchema);

module.exports = Orders;
