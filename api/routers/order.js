const express = require('express')
const { sendOrderConfirmationMail } = require('../emails/account')
const Order = require('../models/order')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post("/orders", auth, async (req, res) => {
    const order = new Order({
        ...req.body,
        owner: req.user._id
    })

    try {
        await order.save()
        sendOrderConfirmationMail(order)
        res.status(201).send(order)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.get("/orders/me", auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'orders',
            match,
            options: {
                limit: req.query.limit ? parseInt(req.query.limit) : 100,
                skip: req.query.skip ? parseInt(req.query.skip) : 0,
                sort
            }
        }).execPopulate()

        res.send(req.user.orders)
    } catch (e) {
        res.status(500).send()
    }
});

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


module.exports = router
