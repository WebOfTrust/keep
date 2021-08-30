/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  testMatch: ['<rootDir>/src/app/**/*.spec.js'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  modulePaths: ['<rootDir>/src/app/'],
  globals: {
    NODE_ENV: 'test',
  },
  verbose: true,
};
