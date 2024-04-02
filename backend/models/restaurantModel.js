import mongoose from 'mongoose';
import validator from 'validator';

const validateCoordinates = (val) => {
  // Regex to match decimal numbers with up to 15 decimal places
  const regex = /^[-+]?([1-8]?\d(\.\d{1,15})?|90(\.0{1,15})?)$/;
  return regex.test(val.toString());
};

const restaurantSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate(value){
      if (!validator.isEmail(value)){
        throw new console.error("Invalid Email");
      }
    }
  },

  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    min: 10,
    max: 10,
  },

  ownerName: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true,
    enum: ['veg', 'non-veg']
  },
  location: {
    type: String,
    required: true,
  },

  latitude: {
    type: Number,
    required: true,
    validate: [validateCoordinates, 'Invalid latitude value'],
  },
  longitude: {
    type: Number,
    required: true,
    validate: [validateCoordinates, 'Invalid longitude value'],
  },

  cuisine: { 
    type: String, 
    required: true 
  },

  fassaiCode: { 
    type: String, 
    required: true, 
    unique: true 
  },

  password: { 
    type: String, 
    required: true 
  },

});

const restaurantModel = mongoose.model('Restaurant', restaurantSchema);

export default restaurantModel;