module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  snapshotSerializers: [
    'jest-serializer-path'
  ]
};