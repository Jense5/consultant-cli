// @flow

import chalk from 'chalk';

exports.invalidURI = (): string => `
  ${chalk.red('Invalid URI provided! 🤦‍')}

  Don't worry, I'm sure you will be able to figure it out!
`;

exports.duplicateName = (): string => `
  ${chalk.red('Boilerplate name is already in use! 🤦‍')}

  Please provide a custom name for the boilerplate with the --name option.
`;

exports.removeSuccess = (): string => `
  ${chalk.cyan('Ok')}, I removed all boilerplates! 👌
`;

exports.nevermind = (): string => `
  ${chalk.cyan('Ok')}, nevermind! 👌
`;

exports.invalidCommand = (): string => `
  ${chalk.red.bold('Invalid use of Consultant 🤦‍')}
  No command specified!

  Please use one of the commands below:
  create - add - remove - snapshot - init - help

  For more information, hit me up on Github or check the documentation:
  ${chalk.cyan('https://github.com/Jense5/consultant')}
`;

const listRawBPs = (names: Array<string>): string => `
  ${chalk.cyan('List of installed boilerplates:')}

${names.map(name => `    - ${name}`).join('\n')}
`;

const noBPs = (): string => `
  ${chalk.red('No boilerplates installed! 😭')}
`;

exports.listBPs = (names: Array<string>): string =>
  (names.length > 0 ? listRawBPs(names) : noBPs());

exports.removedTemplate = (): string => `
  ${chalk.cyan('Ok')}, I removed it! 🤘
`;

exports.startClone = (): string => `
  Starting to clone...`;

exports.installedTemplate = (name: string): string => `  Installed ${chalk.cyan(name)}! 🤞
`;

exports.startCopy = (): string => `
  Starting to copy...`;

exports.noUrl = (): string => `
  ${chalk.red('No link provided! 🤦‍')}
`;

exports.unableToClone = (): string => `
  ${chalk.red('Unable to clone this repo!')}
  Make sure that it is a valid git repository to clone.
  If can't \`git clone\` it, it's invalid.
`;

exports.unableToCopy = (): string => `
  ${chalk.red('Unable to copy the boilerplate!')}
  Make sure the given folder does exist.
  Please check the regex for online repos: /http/g
`;

/**
 * Returns a string to print that displays all the given names in a list. If the given list is
 * empty, it will return a formatted message saying the list is empty.
 * @param {Array<string>} names The names of the templates to display
 * @returns {string} The string which is formatted to display to the user
 */
exports.listTemplates = (names: Array<string> = []): string =>
  (names.length > 0 ? `
  ${chalk.cyan('List of installed boilerplates:')}

${names.map(name => `    - ${name}`).join('\n')}
` : `
  ${chalk.red('No boilerplates installed! 😭')}
`);

exports.templateAlreadyExists = (input: string) => `Template '${input}' already exists! 😕`;
exports.templateNotInstalled = (input: string) => `Template ${input} not installed! 😕`;

exports.createdTemplate = () => 'Created template.';

exports.help = () => `
  Welcome to consultant! 🎉

  If you are new to this tool, I advise you to checkout the quickstart:
  ${chalk.cyan('https://jense5.github.io/consultant/quickstart.html')}

  In this version, you can use the following commands:
  create - add - snapshot - list - remove - reset - help

  Problems, questions, or just want to share some thoughts? 🤔
  ${chalk.cyan('https://jense5.github.io/consultant/thoughts.html')}

  Have fun! 🍻
`;
