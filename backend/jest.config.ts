import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.ts'],
  collectCoverageFrom: ['src/*/*.ts'],
  testPathIgnorePatterns: ['<rootDir>/build/'],
}

export default config
