import express from 'express'

import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB!');
}
)
.catch((err) =>{
    console.log(err);
}); 

const app = express();
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.use(cors("*"));


app.listen(3000, () => {
    console.log('Server in running on port 3000!');
}
); 

app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Sever Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});