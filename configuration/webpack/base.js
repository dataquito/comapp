const path = require('path');
const root = path.join(__dirname, '../../');

module.exports = function () {
  return {
    entry: [
      path.resolve(path.join(root, 'src'), 'index.js')
    ],
    node: {
      fs: 'empty'
    },
    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        path.join(root, 'src'),
        path.join(root, 'node_modules')
      ],
      alias: {
        'app-scripts': path.join(root, 'src/common/scripts'),
        'app-styles': path.join(root, 'src/common/styles'),
        'app-modules': path.join(root, 'src/modules'),
        'app-images': path.join(root, 'src/common/images'),
        'app-redux': path.join(root, 'src/redux'),
        'app-api': path.join(root, 'src/api')
      }
    }
  };
};
