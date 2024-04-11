import express from 'express';
import dotenv from 'dotenv';


const router = express.Router();


router.get('/orders/pending', async (req, res) => {
    try {
        const pendingOrders = await Order.find({ status: 'pending' });
        res.json(pendingOrders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to update order status to accepted or completed
router.put('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (req.body.status) {
            order.status = req.body.status;
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;

