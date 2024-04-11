import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true,
    },

    quantity: {
        type: number,
        required: true,
    },

    totalPrice: {
        type: number,
        required: true,
    },

    orderDateTime: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed'],
        default: 'pending'
    },

    userId: {
        type: String,
        required: true,
    },

});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;