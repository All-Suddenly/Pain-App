module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/client/src'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],

  // coverage
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['.+?.d.ts$'],

  // settings
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
