const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
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
    status: {
        type: String,
        default: 'active',
    }
}, {
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category