module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,vue}', '!**/node_modules/**'],
  coverageReporters: ['html'],
  setupFiles: ['<rootDir>/tests/unit/setup.ts'],
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  moduleNameMapper: {
    '^@Components/(.+)$': '<rootDir>/src/components/$1',
    '^@Views/(.*)$': '<rootDir>/src/views/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.tsx?$$': 'ts-jest',
  },
  verbose: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/src/main.ts',
    '<rootDir>/src/plugins/*',
    '<rootDir>/src/registerServiceWorker.ts',
  ],
};
