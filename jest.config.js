// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
  
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Automatically clear mock calls and instances between every test
  'clearMocks': true,
  // The directory where Jest should output its coverage files
  'coverageDirectory': '.coverage',
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // By default jest will use a node environment, so DOM elements (like document) will be undefined without this
  'testEnvironment': 'jsdom',

  // Add more setup options before each test is run
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@/src/(.*)$': '<rootDir>/src/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/auth/(.*)$': '<rootDir>/src/authentification/$1',
    '^@/layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@/DataTypes/(.*)$': '<rootDir>/src/DataTypes/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
    '^@/common/(.*)$': '<rootDir>/src/common/$1',
    '^@/FormElements/(.*)$': '<rootDir>/src/common/FormElements/$1',
    '^@/(.*)$': '<rootDir>/$1'
  },
  testEnvironment: 'jest-environment-jsdom', 
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)