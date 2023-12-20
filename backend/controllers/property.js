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


exports.getProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({}).exec();
    res.status(200).json(properties);
  } catch (err) {
    next(errorHandler(500, 'Internal Server Error'));
  }
};

exports.searchOrGetProperties = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm;

    if (searchTerm) {
      // Perform search
      const properties = await searchProperties(searchTerm);
      res.status(200).json(properties);
    } else {
      // Get all properties
      const properties = await Property.find({}).exec();
      res.status(200).json(properties);
    }
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'));
  }
};

const searchProperties = async (searchTerm) => {
  try {
    const properties = await Property.find(
      { $text: { $search: searchTerm } },
      { score: { $meta: 'textScore' } } // Add score for sorting
    )
      .sort({ score: { $meta: 'textScore' } }) // Sort by text score
      .exec();

    return properties;
  } catch (error) {
    console.error('Error searching properties:', error);
    throw error;
  }
};

exports.getOrFilterProperties = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;

    let filter = {};

    if (searchTerm) {
      filter.$text = { $search: searchTerm };
    }

    if (maxPrice !== null && !isNaN(maxPrice)) {
      filter.price = { $lte: maxPrice };
    }

    const properties = await Property.find(filter)
      .sort({
        ...(searchTerm ? { score: { $meta: 'textScore' } } : {}),
        ...(maxPrice !== null ? { price: -1 } : {}), // Sort by price in descending order
      })
      .exec();

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error:', error);
    next(errorHandler(500, `Internal Server Error: ${error.message}`));
  }
};