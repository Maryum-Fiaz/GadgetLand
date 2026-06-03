import express from 'express'
import dotenv from 'dotenv'
const app = express()
import { connectDatabase } from './config/dbConnect.js'
import errorMiddleware from './middleware/error.js'

// Handle uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1);
})

dotenv.config({path: 'backend/config/config.env'})

// Database connection
connectDatabase()

app.set('query parser', 'extended');
app.use(express.json());


// Import all Routes
import productRoutes from './routes/products.js'
app.use('/api/v1', productRoutes)

// Using error middleware
app.use(errorMiddleware)


const server = app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Handle Unhandled promise rejection (async error)
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err}`);
    console.log('Shutting down server due to unhandled Promise Rejection');
    server.close(()=>{
        process.exit(1);
    });     // server shut down
})