var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

var Property = mongoose.model('Listing', propertySchema);

// Inserting mock data
var mockListings = [
  {
    title: 'Enchanting Castle',
    description: 'A majestic castle with breathtaking views.',
    price: 1000000,
    location: 'Fairyland',
    imageURL: 'https://example.com/castle.jpg',
    latitude: 40.7128, // Example latitude for Fairyland
    longitude: -74.0060, // Example longitude for Fairyland
  },
  {
    title: 'Cozy Cottage',
    description: 'A charming cottage with a fireplace.',
    price: 500000,
    location: 'Countryside',
    imageURL: 'https://example.com/cottage.jpg',
    latitude: 34.0522, // Example latitude for Countryside
    longitude: -118.2437, // Example longitude for Countryside
  },
  {
    title: 'Luxurious Mansion',
    description: 'A grand mansion with modern amenities.',
    price: 2000000,
    location: 'City Center',
    imageURL: 'https://example.com/mansion.jpg',
    latitude: 37.7749, // Example latitude for City Center
    longitude: -122.4194, // Example longitude for City Center
  },
];

// Property.insertMany(mockListings, function(err) {
//   if (err) {
//     console.error('Error inserting mock listings:', err);
//   } else {
//     console.log('Mock listings inserted successfully.');
//   }
// });

module.exports = Property;
