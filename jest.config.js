/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  rootDir: "./src",
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./shared/tests/validations.ts"],
  collectCoverage: false,
  coverageDirectory: '<rootDir>/../__coverage',
  coverageReporters: [
    'html'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      statements: 80,
      functions: 80,
      lines: 80
    }
    // "./src/category/domain": {
    //   statements: 10,
    //   branches: 10,
    //   functions: 10,
    //   lines: 10
    // }
  }
};
