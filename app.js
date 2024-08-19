const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const db = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const authUserRoutes = require('./routes/authUserRoutes');
const accountRoutes = require('./routes/accountRoutes');
const depositRoutes = require('./routes/depositRoutes');
const withdrawalRoutes = require('./routes/withdrawalRoutes');
const billPaymentRoutes = require('./routes/billPaymentRoutes');
const transferRoutes = require('./routes/transferRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/admin', adminRoutes);
app.use('/authUser', authUserRoutes);
app.use('/account', accountRoutes);
app.use('/deposit', depositRoutes);
app.use('/withdrawal', withdrawalRoutes);
app.use('/bill-payment', billPaymentRoutes);
app.use('/transfer', transferRoutes);
app.use('/transaction', transactionRoutes);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

module.exports = app;
