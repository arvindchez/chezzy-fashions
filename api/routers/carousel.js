const express = require('express')
const Carousel = require('../models/carousel')

const router = new express.Router()

router.get('/carousel/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const carousel = await Carousel.findOne({ _id })
        if (!carousel) {
            return res.status(404).send()
        }

        res.send(carousel)
    } catch (e) {
        res.status(500).send()
    }
})

router.post("/carousel", async (req, res) => {
    const carousel = new Carousel(req.body);
    const saveCarousel = await carousel.save();
    res.send(saveCarousel);
});

router.post("/carousel/all", async (req, res) => {
    Carousel.insertMany(req.body).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    });
});

router.delete("/carousel/:id", async (req, res) => {
    const deletedCarousel = await Carousel.findByIdAndDelete(req.params.id);
    res.send(deletedCarousel);
});


router.get('/carousel', async (req, res) => {
    try {
        const carousels = await Carousel.find()
        if (!carousels) {
            return res.status(404).send()
        }

        res.send(carousels)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
