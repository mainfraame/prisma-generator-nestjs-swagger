const { config } = require('@swc/core/spack');

const pkg = require('./package.json');

module.exports = config({
  target: 'node',
  externalModules: [
    ...Object.keys(pkg.dependencies).sort(),
    ...Object.keys(pkg.devDependencies).sort()
  ],
  entry: {
    web: __dirname + '/src/generator.ts'
  },
  output: {
    path: __dirname + '/dist',
    // Name is optional.
    name: 'prisma-generator-nestjs-swagger.js'
  }
});
