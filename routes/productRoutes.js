// routes/productRoutes.js

const express = require('express');
const Product = require('../models/product');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    try {
        const { name, price } = req.body;
        const product = new Product({ name, price });
        await product.save();
        res.status(201).send('Product added successfully');
    } catch (error) {
        res.status(500).send('Error adding product');
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

module.exports = router;
