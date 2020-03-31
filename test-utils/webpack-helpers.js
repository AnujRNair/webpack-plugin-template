const path = require('path');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');

/**
 * Where we want to output our files in the memory filesystem
 * @type {string}
 */
const WEBPACK_OUTPUT_DIR = path.join(__dirname, 'dist');

/**
 * Helper function for running a webpack compilation
 * @param {object} webpackConfig - the full webpack config to run
 * @param {function} callbackFn - the function to call when the compilation completes
 * @param {object} [fs] - the filesystem to build webpack into
 * @param {boolean} expectError - whether we expect an error from webpack - if so, pass it through
 */
function webpackCompile(
  webpackConfig,
  callbackFn,
  { fs = null, expectError = false } = {}
) {
  const instance = webpack(webpackConfig);

  const fileSystem = fs || new MemoryFs();
  instance.outputFileSystem = fileSystem;
  instance.run((err, stats) => {
    // test no error or warning
    if (!expectError) {
      expect(err).toBeFalsy();
      expect(stats.compilation.errors.length).toEqual(0);
      expect(stats.compilation.warnings.length).toEqual(0);
    }

    callbackFn({
      files: fileSystem.readdirSync(WEBPACK_OUTPUT_DIR),
    });
  });
}

/**
 * Helper to create a basic webpack config which can then be used in the compile function
 * @param plugins[] - array of plugins to pass into webpack
 * @param {string} publicPath - publicPath setting for webpack
 * @return {{mode: string, output: {path: string, filename: string}, entry: string, plugins: *}}
 */
function createWebpackConfig(plugins, publicPath = undefined) {
  return {
    mode: 'none',
    entry: path.join(__dirname, '..', 'test-utils', 'fixtures', 'index.js'),
    output: {
      path: WEBPACK_OUTPUT_DIR,
      publicPath,
      filename: 'index.bundle.js',
    },
    plugins,
  };
}

module.exports = {
  WEBPACK_OUTPUT_DIR,
  webpackCompile,
  createWebpackConfig,
};
