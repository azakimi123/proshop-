const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMid = require('./middleware/errorMiddleware');

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

//fallback for 404 errors, not an actual route
app.use(errorMid.notFound)

//error middleware
app.use(errorMid.errorHandler)

const PORT = process.env.PORT

// console.log(errorMid)

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`))