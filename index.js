const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
