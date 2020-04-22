const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { defaults: tsjPreset } = require('ts-jest/presets');

const { compilerOptions } = require('./tsconfig');

module.exports = {
  transform: {
    ...tsjPreset.transform,
  },
  testRegex: '(/__(tests|specs)__/.*|(\\.|/)(tests|spec))\\.([tj]sx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file-mock.js',
    '^@components\/(.*)$/': '~/src/components/$1',
    '^@containers\/(.*)$/': '~/src/containers/$1',
    '^@hooks\/(.*)$/': '~/src/hooks/$1',
    '^@remotes\/(.*)$/': '~/src/remotes/$1',
    '^@shared\/(.*)$/': '~/src/shared/$1',
    '^@utils\/(.*)$/': '~/src/utils/$1',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  },
  testPathIgnorePatterns: ['node_modules', '.cache'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: false,
      autoMapModuleNames: true,
    },
  },
  testURL: 'http://localhost',
};
