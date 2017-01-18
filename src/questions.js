// @flow

export default [
  {
    type: 'input',
    name: 'name',
    message: 'name: ',
    default: 'custom-tool',
  },
  {
    type: 'input',
    name: 'command',
    message: 'command-name: ',
    default: 'tool-run',
  },
  {
    type: 'input',
    name: 'version',
    message: 'version: ',
    default: '0.1.0',
  },
  {
    type: 'input',
    name: 'description',
    message: 'description: ',
    default: 'A cool tool!',
  },
  {
    type: 'input',
    name: 'repository',
    message: 'repository: ',
    default: 'no-repo',
  },
  {
    type: 'input',
    name: 'author',
    message: 'author: ',
    default: 'Jensen Bernard',
  },
  {
    type: 'input',
    name: 'license',
    message: 'license: ',
    default: 'MIT',
  },
  {
    type: 'checkbox',
    name: 'modules',
    message: 'Please choose some basic features',
    choices: [
      {
        name: 'command-line parser',
        value: 'commander',
      },
      {
        name: 'web-scraper',
        value: 'cheerio',
      },
    ],
  },
];
