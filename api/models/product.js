const mongoose = require('mongoose')
const shortid = require("shortid");
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema(
    {
        _id: {
            type: String, default: shortid.generate
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Price must be a positive number')
                }
            }
        },
        avatar: {
            type: Buffer
        },
        availableSizes: [String],
        availableColours: [String],
    }, {
    timestamps: true
})

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema)

module.exports = Product