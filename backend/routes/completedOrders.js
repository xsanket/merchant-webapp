import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import TransactionModel from '../models/transactionModel.js';

const router = express.Router();

router.get('/completed-order', authMiddleware, async (req, res) => {
    try {
        const orders = await TransactionModel.find();
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