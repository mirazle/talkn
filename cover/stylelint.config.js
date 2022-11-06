module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-styled-components', 'stylelint-config-prettier'],
  customSyntax: '@stylelint/postcss-css-in-js',
  rules: {
    'function-name-case': null,
    'function-no-unknown': null,
    'no-empty-source': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'max-line-length': 160,
  },
};
