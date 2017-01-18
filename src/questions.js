// @flow

/**
 * Const Array with all questions to present to the user when asking about different options of his
 * boilerplate. All these variables can be used in the template engine! Input types are strings,
 * but the elements of the list (of options) are booleans. Feel free to add as many options as
 * you like! The more options, the more powerful Consultant becomes.
 * @constant
 * @type {Array<string>}
 */
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
      {
        name: 'lodash',
        value: 'lodash',
      },
    ],
  },
];
