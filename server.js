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

const Order = mongoose.model('order', new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    email: String,
    name: String,
    address: String,
    phone: String,
    total: Number,
    cartItems: [
        {
            _id: String,
            title: String,
            price: Number,
            count: Number
        },
    ],
}, {
    timestamps: true
}))

app.post("/api/orders", async (req, res) => {
    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.phone ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
    ) {
        return res.send({ message: "Data is required." });
    }
    const order = await Order(req.body).save();
    res.send(order);
});

app.get("/api/orders", async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
});

app.delete("/api/orders/:id", async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
});

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`server started listening on port: ${port}`)
})