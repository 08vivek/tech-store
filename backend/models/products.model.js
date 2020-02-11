const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    featured: {type: Boolean, required: true},
    image: {type: Object, required: true},
    category: {type: String, required:true},
    free_shipping: {type: Boolean,required: true}
},{timestamps: true});

const Products = mongoose.model('Products',productsSchema);

module.exports = Products;
