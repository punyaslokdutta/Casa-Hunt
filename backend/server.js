const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

var propertyRouter = require('../backend/routes/property.route.js')

const app = express();
app.use(express.json());

app.use('/v1/properties', propertyRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});




//error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
