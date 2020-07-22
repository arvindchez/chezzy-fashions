const mongoose = require('mongoose')
const shortid = require("shortid");
const User = require('./user');

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
    status: {
        type: String,
        default: 'active',
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

orderSchema.methods.loadUser = async function () {
    const order = this
    const user = await User.findById({ _id: order.owner })

    if (!user) {
        throw new Error('Unable to load user data')
    }

    order.owner = user._id
    order.email = user.email
    order.name = `${user.firstName} ${user.lastName}`
    order.phone = user.phone
    order.address = user.address

    return order
}

const Order = mongoose.model('Order', orderSchema)

module.exports = Order