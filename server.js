const express = require('express');
const https = require('https');
const fs = require('fs');
const limiter = require('./middlewares/rateLimitMiddleware');
const corsMiddleware = require('./middlewares/corsMiddleware');
const helmetMiddleware = require('./middlewares/helmetMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { handleError } = require('./middlewares/errorHandler');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(limiter); 
app.use(corsMiddleware); 
app.use(helmetMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/admin', adminRoutes);


app.use(handleError);


const httpsOptions = {
    key: fs.readFileSync('path/to/private/key.pem'),
    cert: fs.readFileSync('path/to/certificate.pem')
};

 
const PORT = process.env.PORT || 3000;
https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
