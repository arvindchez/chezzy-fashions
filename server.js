const express = require('express')
require('./api/db/mongoose')
const userRouter = require('./api/routers/user')
const taskRouter = require('./api/routers/task')
const productRouter = require('./api/routers/product')
const orderRouter = require('./api/routers/order')
const carouselRouter = require('./api/routers/carousel')

const app = express();
const port = process.env.PORT

let staticPath = __dirname;
let indexPath = __dirname;

if (process.env.NODE_ENV === 'production') {
    staticPath = staticPath + "/build";
    indexPath = indexPath + "/build/index.html";
}

app.use("/", express.static(staticPath));
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(productRouter)
app.use(orderRouter)
app.use(carouselRouter)

app.get("*", (req, res) => res.sendFile(indexPath));

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})
