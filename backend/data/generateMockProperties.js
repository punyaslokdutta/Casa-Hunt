const { faker } = require('@faker-js/faker');



const generateMockProperties = (count) => {
  const mockProperties = [];

  for (let i = 1; i <= count; i++) {
    const property = {
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price({ min: 100000, max: 2000000 }),
      location: faker.location.city(),
      imageURL: 'https://github.com/punyaslokdutta/Casa-Hunt/assets/13198518/30b4b550-3efe-4028-8c56-8bcaffb75c68',
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    };

    mockProperties.push(property);
  }

  return mockProperties;
};

module.exports = generateMockProperties;
