const express = require('express')
const Product = require('../models/product')
const multer = require('multer')
const sharp = require('sharp')
const { escapeStringLiterals, getUnique } = require('../common/utils')

const router = new express.Router()

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

router.get('/products', async (req, res) => {
    try {
        var query = {};

        const title = req.query.title && escapeStringLiterals(req.query.title)
        const category = req.query.category && escapeStringLiterals(req.query.category)

        if (req.query.title) {
            query = {
                ...query,
                title: {
                    $in: new RegExp(title, "i")
                }
            }
        }

        if (req.query.category) {
            query = {
                ...query,
                category: {
                    $in: new RegExp(category, "i")
                }
            }
        }

        if (req.query.price) {
            query = {
                ...query,
                price: {
                    $lte: parseInt(req.query.price)
                }
            }
        }

        if (req.query.color) {
            query = {
                ...query,
                availableColours: {
                    $eq: req.query.color
                }
            }
        }

        if (req.query.size) {
            const parameters = req.query.size.split(',');
            query = {
                ...query,
                availableSizes: {
                    $in: parameters
                }
            }
        }

        var sortQuery = {};
        if (req.query.sort) {
            const { sort } = req.query;
            if (sort === "latest") {
                sortQuery = {
                    createdAt: 1
                }
            } else if (sort === "lowest") {
                sortQuery = {
                    price: 1
                }
            } else if (sort === "highest") {
                sortQuery = {
                    price: -1
                }
            }
        }

        let options = {
            pagination: false
        };

        let products = await Product.paginate(query, options)
        const result = {
            colors: getUnique(products.docs, 'availableColours', false),
            sizes: getUnique(products.docs, 'availableSizes', false),
            sort: ['latest', 'lowest', 'highest'],
            minPrice: Math.min.apply(Math, products.docs.map(function (o) { return o.price; })),
            maxPrice: Math.max.apply(Math, products.docs.map(function (o) { return o.price; }))
        }

        options = {
            page: req.query.page ? req.query.page : process.env.PAGE_START_INDEX,
            limit: req.query.limit ? req.query.limit : process.env.PAGE_SIZE,
            sort: sortQuery
        };

        products = await Product.paginate(query, options)
        const response = {
            ...result,
            data: products.docs,
            count: products.totalDocs
        }

        res.send(response)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/fproducts', async (req, res) => {

    try {
        const fproducts = await Product.find({ active: true, featured: true })
        res.send(fproducts)
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fieldSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/products/:id/image', upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 1500, height: 2000 }).png().toBuffer()

    const _id = req.params.id
    const product = await Product.findOne({ _id })
    if (!product) {
        return res.status(404).send()
    }

    product.avatar = buffer
    await product.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

module.exports = router
