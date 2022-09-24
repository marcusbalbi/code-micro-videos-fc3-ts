/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  rootDir: "./src",
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./shared/tests/validations.ts"],
};
