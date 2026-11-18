
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    sku: {
        type: String,
        required: true,
        unique: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },

    reorderLevel: {
        type: Number,
        required: true,
        min: 0,
        default: 10
    },

    supplier: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
