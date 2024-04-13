import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConfig from './config/dbConfig.js'
import restRegistration from './routes/restRegRoute.js';
import restLogin from './routes/restLoginRoute.js'
import restProfile from './routes/restProfile.js';
import orderRouter from './routes/orderRoute.js'
import menuRoute from './routes/menuRoute.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
dbConfig.dbConnection();


app.use('/uploads', express.static('uploads')); 
app.use('/menuUploads', express.static('menuUploads')); 


// Routes

app.use('/api', restRegistration);
app.use('/api', restLogin)
app.use('/api', restProfile)
//save order in db
app.use('/api', orderRouter)

//saved menu in db
app.use('/api', menuRoute)



















app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
