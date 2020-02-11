const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri , { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const productsRouter = require('./routes/allproducts');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

app.use('/allproducts',productsRouter);
app.use('/users',usersRouter);
app.use('/orders',ordersRouter);

app.listen(port,() => {
    console.log(`server running on port: ${port}`);
});