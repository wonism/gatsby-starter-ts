module.exports = {
  'plugins': [
    'preval',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-transform-literals',
    // 'const-enum'
  ],
  'presets': [
    [
      'babel-preset-gatsby',
      {
        'targets': {
          'browsers': ['>0.25%', 'not dead']
        }
      }
    ],
    '@babel/preset-env',
  ]
}
