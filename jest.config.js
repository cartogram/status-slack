module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '\\.(gql|graphql)$': 'jest-transform-graphql',
  },
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/packages/web-worker/.*/fixtures',
  ],
  testRegex: '.*\\.test\\.tsx?$',
  testEnvironmentOptions: {
    url: 'http://localhost:3000/',
  },
  coverageDirectory: './coverage/',
  collectCoverage: true,
};
