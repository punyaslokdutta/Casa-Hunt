var Property = require('../models/property');
var errorHandler = require('../utils/error.js');

exports.getProperty = function(req, res, next) {
  try {
    Property.findById(req.params.id, function(err, property) {
      if (err) {
        return next(errorHandler(500, 'Internal Server Error'));
      }
      if (!property) {
        return next(errorHandler(404, 'Property not found!'));
      }
      res.status(200).json(property);
    });
  } catch (error) {
    next(error);
  }
};

exports.getProperties = function(req, res, next) {
  try {
    var limit = 20;
    var startIndex = parseInt(req.query.startIndex) || 0;
    var offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    var searchTerm = req.query.searchTerm || '';

    var sort = req.query.sort || 'createdAt';
    var order = req.query.order || 'desc';

    Property.find({
      $and: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { offer: offer }
      ],
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex)
      .exec(function(err, properties) {
        if (err) {
          return next(errorHandler(500, 'Internal Server Error'));
        }
        res.status(200).json(properties);
      });
  } catch (error) {
    next(error);
  }
};
