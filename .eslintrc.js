module.exports = {
    env: {
        browser: true
    },
	extends: ['airbnb', 'plugin:flowtype/recommended', 'plugin:prettier/recommended', 'prettier/flowtype', 'prettier/react'],

    parser: 'babel-eslint',

    plugins: ['flowtype', 'prettier'],
    'rules': {
        'prettier/prettier': 'error',
        'camelcase': 'off',
        'no-console': 'off'
    }
};
