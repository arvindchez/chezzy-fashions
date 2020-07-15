const sgMail = require('@sendgrid/mail');
const { convertToAppDate } = require('../common/utils')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const formatCurrency = (num) => {
    return Number(parseFloat(num).toFixed(1)).toLocaleString() + "Ft ";
}

const sendWelcomeMail = (order) => {
    composeEmail(order);
    sgMail.send({
        to: order.email,
        from: 'arvind.cheziyan@gmail.com',
        subject: `Thank you! Your order no: ${order._id} has been placed.`,
        html: composeEmail(order)
    })
}

const composeEmail = (order) => {

    const orderDetails = order.cartItems.map((x) => (
        `<div>  ${x.count} ${" x "} ${x.title} </div>`
    ))

    return `<div>
        <h3 style="color: green">Your order has been placed.</h3>
        <h2>Order Number: ${order._id}</h2>
        <ul>
            <li>
                <div><strong>Name</strong>: ${order.name}</strong></div>
            </li>
            <li>
                <div><strong>Email: ${order.email}</strong></div>
            </li>
            <li>
                <div><strong>Phone: ${order.phone}</strong></div>
            </li>
            <li>
                <div><strong>Address: ${order.address}</strong></div>
            </li>
            <li>
                <div><strong>Date: ${convertToAppDate(order.createdAt)}</strong></div>
            </li>
            <li>
                <div><strong>Total: ${formatCurrency(order.total)}</strong></div>
            </li>
            <li>
                <div>Cart Items: ${orderDetails}</div>
             </li>
        </ul>
    </div>`
}


module.exports = {
    sendWelcomeMail
}
