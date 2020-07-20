const mongoose = require('mongoose')
const shortid = require("shortid");

const orderSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate,
    },
    total: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Total must be a positive number')
            }
        }
    },
    cartItems: [
        {
            _id: String,
            title: String,
            price: Number,
            selectedSize: String,
            selectedColor: String,
            count: Number,
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}
    , {
        timestamps: true
    })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order