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
        const result = await order.loadUser()
        sendOrderConfirmationMail(result)
        res.status(201).send(order)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.get("/orders/me", auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.status) {
        match.status = req.query.status === 'active'
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
                limit: req.query.limit ? parseInt(req.query.limit) : parseInt(process.env.PAGE_SIZE),
                skip: req.query.skip ? parseInt(req.query.skip) : parseInt(process.env.PAGE_START_INDEX) - 1, // in mongoose page index starts from 0
                sort
            }
        }).execPopulate()

        res.send({ result: req.user.orders, count: req.user.orders.length })
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
