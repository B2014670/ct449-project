const express = require('express');
const cors = require('cors');

const app = express();
const shopRouter = require('./app/routes/shop.route');


app.use(cors());
app.use(express.json());
app.use('/api/shop', shopRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to shop application' });
});

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});


// app.js

module.exports = app;
