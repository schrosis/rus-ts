module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@schrosis/rus-ts$': '<rootDir>/src',
    '^@schrosis/rus-ts/(.*)$': '<rootDir>/src/$1',
  },
};
