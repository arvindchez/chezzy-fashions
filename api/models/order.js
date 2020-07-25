const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const User = require('./user');

const orderSchema = new mongoose.Schema({
    _id: {
        type: String
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
    deliverystatus: {
        type: String,
        default: 'active',
    },
    currency: {
        type: String,
        required: true,
    },
    paymentstatus: {
        type: String,
        default: 'pending',
    },
    paymentid: {
        type: String
    },
    paymenttype: {
        type: String
    },
    paymentresponse: {
        type: String,
        default: 'awaiting'
    },
    cartItems: [
        {
            _id: String,
            title: String,
            image: String,
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

orderSchema.plugin(mongoosePaginate);

const Order = mongoose.model('Order', orderSchema)

module.exports = Order