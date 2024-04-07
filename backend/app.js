import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConfig from './config/dbConfig.js'
import restRegistration from './routes/restRegRoute.js';
import restLogin from './routes/restLoginRoute.js'
import restProfile from './routes/restProfile.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
dbConfig.dbConnection();


app.use('/uploads', express.static('uploads')); // for images to be served


// Routes

app.use('/api', restRegistration);
app.use('/api', restLogin)
app.use('/api', restProfile)


















app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
