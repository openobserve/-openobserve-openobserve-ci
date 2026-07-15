// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        isolatedModules: true,
      },
    ],
  },
  roots: ['<rootDir>/packages'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  modulePathIgnorePatterns: ['<rootDir>/packages/.*/dist'],
  moduleNameMapper: {
    '^@openobserve/openobserve-ci-plugin-([\\w-]+)/package.json$': '<rootDir>/packages/plugin-$1/package.json',
    '^@openobserve/openobserve-ci-plugin-([\\w-]+)(.*)$': '<rootDir>/packages/plugin-$1/src$2',
    '^@openobserve/openobserve-ci-base/package.json$': '<rootDir>/packages/base/package.json',
    '^@openobserve/openobserve-ci-base(.*)$': '<rootDir>/packages/base/src$1',
    '^@openobserve/openobserve-ci/package.json$': '<rootDir>/packages/openobserve-ci/package.json',
    '^@openobserve/openobserve-ci(.*)$': '<rootDir>/packages/openobserve-ci/src$1',
  },
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
}
