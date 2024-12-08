module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: [
      'node_modules',
      'test-config',
      'interfaces',
      'jestGlobalMocks.ts',
      '.module.ts',
      '<rootDir>/src/types/',
      '.mock.ts',
    ],
    coverageDirectory: 'coverage',
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/dist/',
    ],
  };