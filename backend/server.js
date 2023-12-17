const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const generateMockProperties = require('./data/generateMockProperties');
const Property = require('./models/property')
const populateMockData = require('./data/populateMockData');

const app = express();
app.use(express.json());

// MongoDB Memory Server setup
const startServer = async () => {
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Connected to MongoDB');
  const mockProperties = generateMockProperties(20);
  //mock data for memory db server
  await populateMockData(mockProperties);

  // routes
  var propertyRouter = require('../backend/routes/property.route.js');
  app.use('/v1/properties', propertyRouter);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer().catch((error) => console.error('Error starting the server:', error));




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
