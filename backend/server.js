const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorMid = require('./middleware/errorMiddleware');
const { PAYPAL_CLIENT_ID } = process.env;


dotenv.config()

connectDB()

const app = express();

//parse JSON data from the req.body
app.use(express.json());

//example of how to set up a middleware
// app.use((req, res, next) => {
//   console.log('Hello')
//   next()
// })

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

//route to access paypal credentials
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

//fallback for 404 errors, not an actual route
app.use(errorMid.notFound)

//error middleware
app.use(errorMid.errorHandler)

const PORT = process.env.PORT

// console.log(errorMid)

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`))