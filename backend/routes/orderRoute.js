import express from 'express';
import orderModel from '../models/orderModel.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/order', authMiddleware, async (req, res) => {
    try {

        // const { orderId, dishName, quantity, shippingAddress, totalPrice } = req.body;

        console.log("req body :", req.body)
        const order = new orderModel(req.body);

        await order.save();
        return res.status(200).send({
            success: true,
            message: "Order placed successfully",
            data: order
        })

    } catch (error) {
        console.log("error in catch block")
        return res.status(400).send({

            message: error.message,
            success: false,


        })
    }
});


// fetch the orders
router.get('/order', authMiddleware, async (req, res) => {
    try {
        const orders = await orderModel.find();
        return res.status(200).send({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })


    } catch (error) {
        return res.send({
            success: false,
            message: error.message,

        })

    }
});


export default router;


//

// {
//     "orderId": "ORD12345",
//     "dishName": "Pizza Margherita",
//     "quantity": 1,
//     "shippingAddress" : "Pune",
//     "totalPrice": 12
// }
