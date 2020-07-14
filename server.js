const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/chezzy-fashions", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const Product = mongoose.model("products", new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    image: {
        type: String
    },
    availableSizes: [String]
}));

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (e) {
        res.status(500).send();
    }
})

app.post('/api/products', async (req, res) => {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.send(savedProduct);
})

app.delete('/api/products/:id', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    res.send(product);
})

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`server started listening on port: ${port}`)
})