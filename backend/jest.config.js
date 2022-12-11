module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    './tests/setup.ts'
  ],
  collectCoverageFrom: [
    'src/*/*.ts'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/build/',
  ],
};
