const express = require('express')
const Category = require('../models/category')

const router = new express.Router()

router.get('/category/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const category = await Category.findOne({ _id })
        if (!category) {
            return res.status(404).send()
        }

        res.send(category)
    } catch (e) {
        res.status(500).send()
    }
})

router.post("/category", async (req, res) => {
    const category = new Category(req.body);
    const saveCategory = await category.save();
    res.send(saveCategory);
});

router.post("/category/all", async (req, res) => {
    Category.insertMany(req.body).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    });
});

router.delete("/category/:id", async (req, res) => {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    res.send(deletedCategory);
});


router.get('/category', async (req, res) => {
    try {
        const categories = await Category.find()
        if (!categories) {
            return res.status(404).send()
        }

        res.send(categories)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
