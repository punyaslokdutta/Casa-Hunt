
const Property = require('../models/property')

const populateMockData = async (mockProperties) => {
    try {
      await Property.insertMany(mockProperties);
      console.log('Mock properties inserted successfully.');
    } catch (error) {
      console.error('Error inserting mock properties:', error);
    }
  };


module.exports = populateMockData;