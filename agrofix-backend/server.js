const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminProductRoutes = require('./routes/adminProductRoutes');
const adminUsersRoutes = require('./routes/adminUsersRoutes');

// user routes
app.use('/', productRoutes);
app.use('/', orderRoutes);
app.use('/', userRoutes);


// admin routes
// Ensure that admin routes are protected and only accessible by admins
app.use('/admin', adminRoutes);
app.use('/admin', adminProductRoutes);
app.use('/admin', adminUsersRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
