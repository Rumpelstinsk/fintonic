module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  rootDir: './src',
  moduleNameMapper: {
    '@modules/(.*)': '<rootDir>/modules/$1',
    '@shared/(.*)': '<rootDir>/shared/$1',
    '@config/(.*)': '<rootDir>/config/$1',
    '@shared/(.*)': '<rootDir>/shared/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};
