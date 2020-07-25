const express = require('express')
const shortid = require("shortid");
const { sendOrderConfirmationMail } = require('../emails/account')
const Order = require('../models/order')
const Razorpay = require('razorpay')
const crypto = require('crypto')
const auth = require('../middleware/auth')

const router = new express.Router()

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})

router.post("/orders", auth, async (req, res) => {
    const order = new Order({
        ...req.body,
        owner: req.user._id
    })

    try {
        order.total = req.body.cartItems.reduce((a, c) => a + c.price * c.count, 0)
        order.currency = process.env.PAYMENT_CURRENCY
        order._id = shortid.generate()

        if (order.paymenttype !== "cod") {
            const payment_capture = 1
            const options = {
                amount: order.total,
                currency: order.currency,
                receipt: order._id,
                payment_capture
            }

            const response = await razorpay.orders.create(options)
            order.paymentid = response.id
        }

        await order.save()
        if (order.paymenttype === "cod") {
            const result = await order.loadUser()
            sendOrderConfirmationMail(result)
        }

        res.status(201).send(order)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.get('/orders/me', auth, async (req, res) => {
    try {
        var query = {
            owner: {
                $eq: req.user._id
            }
        }

        if (req.query.query) {
            query = {
                owner: {
                    $eq: req.user._id
                },
                _id: {
                    $in: new RegExp(req.query.query, "i")
                }
            };
        }

        const options = {
            page: req.query.page ? req.query.page : process.env.PAGE_START_INDEX,
            limit: req.query.limit ? req.query.limit : process.env.PAGE_SIZE
        };

        const orders = await Order.paginate(query, options)
        res.send({ result: orders.docs, count: orders.totalDocs })
    } catch (e) {
        res.status(500).send()
    }
})

router.delete("/orders/:id", auth, async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!order) {
            res.status(404).send()
        }

        res.send(order)
    } catch (e) {
        res.status(500).send()
    }
});

router.post('/verification', async (req, res) => {
    const secret = process.env.RAZOR_SECRET
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    if (digest === req.headers['x-razorpay-signature']) {

        let razorResponse = JSON.stringify(req.body, null, 4)
        razorResponse = JSON.parse(razorResponse)
        const orderId = razorResponse.payload.payment.entity.order_id
        const status = razorResponse.payload.payment.entity.status

        const order = await Order.findOne({ paymentid: orderId })

        if (!order) {
            return res.status(404).send()
        }

        order.paymentresponse = JSON.stringify(req.body, null, 4)
        order.paymentstatus = status
        await order.save()

        const result = await order.loadUser()
        sendOrderConfirmationMail(result)
    } else {
        return res.status(404).send()
    }

    res.json({ status: 'ok' })
})


module.exports = router
