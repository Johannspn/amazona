import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.remove({}); // {} means return all object inside product model
  const createdProducts = await Product.insertMany(data.products); //insert array of products from data.js in product model in database:
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);

  res.send({ createdProducts, createdUsers });
});
export default seedRouter;
