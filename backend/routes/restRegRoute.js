import express from 'express';
import bcrypt from 'bcryptjs'
import restaurantModel from '../models/restaurantModel.js';


const router = express.Router();

router.post('/restaurant-registration', async (req, res) => {
  try {
    const { profilePicture, name, email, phoneNumber, ownerName, category, location, latitude, longitude, cuisine, fassaiCode, password } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // instance after password hashing 
    const restaurant = new restaurantModel({ profilePicture, name, email, phoneNumber, ownerName, category, location, latitude, longitude, cuisine, fassaiCode, password: hashedPassword });

    // user exist or not
    const userExist = await restaurantModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Save into db
    const savedRestaurant = await restaurant.save();

    // success msg
    res.status(201).json({
      success: true,
      message: "Restaurant registered successfully",
      data: savedRestaurant
    });

  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      res.status(400).json({ errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


export default router;



/*****************************
http://localhost:3000/api/restaurant-registration

 test route 
{
  "profilePicture": "https://example.com/profile.jpg",
  "name": "Test Restaurant",
  "email": "test@example.com",
  "phoneNumber": "1234567890",
  "ownerName": "John Doe",
  "category": "veg",
  "location": "123 Main St, City",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "cuisine": "Italian",
  "fassaiCode": "ABC123DEF456",
  "password": "password123"
}

*/