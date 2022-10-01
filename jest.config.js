module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@schrosis/rusty-ts$': '<rootDir>/src',
    '^@schrosis/rusty-ts/(.*)$': '<rootDir>/src/$1',
  },
}
