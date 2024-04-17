module.exports = {
  // 'src/**/*.(ts|js)?(x)': ['eslint --cache --fix', 'prettier --write'],
  'src/**/*.(html)': [
    'prettier --write "src/**/*.html" --parser angular --html-whitespace-sensitivity ignore',
  ],
  // 'src/**/*.(css|scss|less)': ['stylelint --fix'],
};