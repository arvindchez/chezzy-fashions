const express = require('express')
const Product = require('../models/product')

const router = new express.Router()

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products) {
            return res.status(404).send()
        }

        res.send(products)
    } catch (e) {
        res.status(500).send()
    }
});

router.get('/products/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const product = await Product.findOne({ _id })
        if (!product) {
            return res.status(404).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

router.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

router.post("/products/all", async (req, res) => {
    Product.insertMany(req.body).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    });
});

router.delete("/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});

module.exports = router
