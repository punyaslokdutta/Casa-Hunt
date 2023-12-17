const { faker } = require('@faker-js/faker');

const generateMockProperties = (count) => {
  const mockProperties = [];

  for (let i = 1; i <= count; i++) {
    const property = {
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price({ min: 100000, max: 2000000 }),
      location: faker.location.city(),
      imageURL: faker.image.urlLoremFlickr(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    };

    mockProperties.push(property);
  }

  return mockProperties;
};

module.exports = generateMockProperties;
