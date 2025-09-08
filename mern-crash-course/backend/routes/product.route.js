import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import { deleteProducts, getProducts, postProducts, putProducts } from '../controller/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', postProducts)
router.delete('/:id', deleteProducts)
router.put('/:id', putProducts)

export default router;