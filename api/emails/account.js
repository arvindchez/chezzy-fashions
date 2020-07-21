const sgMail = require('@sendgrid/mail');
const { convertToAppDate, formatCurrency } = require('../common/utils')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: {
            email: 'arvind.chez@gmail.com',
            name: 'Chez Corporation'
        },
        subject: 'Thanks for joining in! :)',
        text: `Welcome to the app ${name}. Let me know how you get along with app.`
    })
}

const sendCancellationMail = (email, name) => {
    sgMail.send({
        to: email,
        from: {
            email: 'arvind.chez@gmail.com',
            name: 'Chez Corporation'
        },
        subject: 'Sorry to see you go! :(',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

const sendOrderConfirmationMail = (order) => {
    sgMail.send({
        to: {
            email: order.email,
            name: order.name
        },
        // bcc: {
        //     email: 'babuskahungary@gmail.com',
        //     name: 'Babuska Hungary'
        // },
        from: {
            email: 'arvind.chez@gmail.com',
            name: 'Babuska Hungary'
        },
        subject: `Thank you! Your order no: ${order._id} has been placed.`,
        html: composeEmail(order)
    })
}

const composeEmail = (order) => {
    const orderDetails = order.cartItems ? (order.cartItems.map((x) => (
        `<div><span style="color:orange;font-weight:bold">
          ${x.count} x  ${x.title} (Size/Colour - ${x.selectedSize}/${x.selectedColor})
          </span></div>`
    ))) : (`<div>No orders!</div>`)

    return `<div>
        <h3 style="color: green">Your order has been placed.</h3>
        <h2>Order Number: ${order._id}</h2>
        <ul>
            <li>
                <div><strong>Name</strong>: ${order.name}</div>
            </li>
            <li>
                <div><strong>Email:</strong> ${order.email}</div>
            </li>
            <li>
                <div><strong>Phone:</strong> ${order.phone}</div>
            </li>
            <li>
                <div><strong>Address:</strong> ${order.address}</div>
            </li>
            <li>
                <div><strong>Date:</strong> ${convertToAppDate(order.createdAt)}</div>
            </li>
            <li>
                <div><strong>Total:</strong><span style="color:blue;font-weight:bold">${formatCurrency(order.total)}</span></div>
            </li>
            <li>
                <div><strong>Cart Items:<strong> ${orderDetails}</div>
             </li>
        </ul>
    </div>`
}


module.exports = {
    sendOrderConfirmationMail, sendWelcomeMail, sendCancellationMail
}