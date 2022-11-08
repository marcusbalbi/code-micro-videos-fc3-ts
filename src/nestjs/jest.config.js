module.exports = {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@balbi/core/(.*)$': '<rootDir>/../../../node_modules/@balbi/core/dist/$1',
    '#core/(.*)$': '<rootDir>/../../../node_modules/@balbi/core/dist/$1',
  }
};