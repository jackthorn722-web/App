const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Work around package-export resolution that can pull ESM web builds with
// import.meta into non-module script contexts in this environment.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
