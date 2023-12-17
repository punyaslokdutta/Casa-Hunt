var Property = require('../models/property');
var errorHandler = require('../utils/error.js');

exports.getProperty = async function(req, res, next) {
  try {
    const property = await Property.findById(req.params.id).exec();
    if (!property) {
      return next(errorHandler(404, 'Property not found!'));
    }
    res.status(200).json(property);
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'));
  }
  
};


  exports.getProperties = async function (req, res, next) {
    try {
      const properties = await Property.find({}).exec();
      res.status(200).json(properties);
    } catch (err) {
      next(errorHandler(500, 'Internal Server Error'));
    }
  };

