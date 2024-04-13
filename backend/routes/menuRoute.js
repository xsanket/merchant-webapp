import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import menuUpload from '../middlewares/menuMulterMiddleware.js';
import menuModel from '../models/menuModel.js';

const router = express.Router();

//save menu in db
router.post('/menu', menuUpload.single('image'), async (req, res) => {
    try {
        const image = req.file.filename;
        console.log('req.body:', req.body);
        const { dishName, description, price } = req.body;

        const menu = new menuModel({
            image,
            dishName,
            description,
            price,
        });

        const savedMenu = await menu.save();

        res.send({
            message: 'Menu saved successfully',
            data: savedMenu
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

router.get('/get-menu', async (rec, res) => {
    try {
        const menus = await menuModel.find();
        res.send({
            message: 'Menus fetched successfully',
            data: menus
        });

    } catch (error) {
        return res.send({
            message: error.message,
        })
    }
})




export default router;