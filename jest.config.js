module.exports = {
  testRegex: '\\.spec\\.[jt]sx?$',
  rootDir: 'src',
  transform: {
    '^.+\\.ts$': 'babel-jest',
  },
}
