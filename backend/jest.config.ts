import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  testMatch: ['<rootDir>/__tests__/**/*.test.(ts|js)'],
  collectCoverageFrom: ['src/*/*.ts'],
  testPathIgnorePatterns: ['<rootDir>/build/'],
  reporters: ['default', 'jest-stare'],
}

export default config
