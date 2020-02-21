module.exports = ({ file }) => ({
  parser: file.extname === '.css' ? 'postcss-safe-parser' : false
});
