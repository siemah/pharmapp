module.exports = {
  "roots": [
    "<rootDir>/src/__tests__"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironment: "node",
  globalSetup: './src/config/testSetup.js'
}