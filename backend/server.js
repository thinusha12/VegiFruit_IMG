require('dotenv').config();
const express = require('express');
const cors = require('cors');

const ConnectMongoDB = require('./databases/ConnectMongoDB');

const ProductRoute = require('./routes/ProductRoutes');
const UserRoute = require('./routes/UserRoutes');
const OrderRoute = require('./routes/OrderRoutes');

const URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

const app = express()

app.use(cors());
app.use(express.json());

app.use('/api/user', UserRoute);
app.use('/api/product', ProductRoute);
app.use('/api/order', OrderRoute);

ConnectMongoDB(URL);

app.listen(PORT, () => {
    console.log(`App is Up and Running on PORT ${PORT}`);
});