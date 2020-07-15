const sgMail = require('@sendgrid/mail');

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
        <h2>Order ${order._id}</h2>
        <ul>
            <li>
                <div>Name:</div>
                <div>${order.name}</div>
            </li>
            <li>
                <div>Email:</div>
                <div>${order.email}</div>
            </li>
            <li>
                <div>Phone:</div>
                <div>${order.phone}</div>
            </li>
            <li>
                <div>Address:</div>
                <div>${order.address}</div>
            </li>
            <li>
                <div>Date:</div>
                <div>${order.createdAt}</div>
            </li>
            <li>
                <div>Total:</div>
                <div>${formatCurrency(order.total)}</div>
            </li>
            <li>
                <div>Cart Items:</div>
                <div>
                    ${orderDetails}
                </div>
            </li>
        </ul>
    </div>`
}


module.exports = {
    sendWelcomeMail
}
