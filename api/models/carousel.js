const mongoose = require('mongoose')

const carouselSchema = new mongoose.Schema({
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

const Carousel = mongoose.model('Carousel', carouselSchema)

module.exports = Carousel