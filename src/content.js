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

exports.listBPs = (names: Array<string>): string => `
  ${chalk.cyan('List of installed boilerplates:')}

  ${names.map(name => `    - ${name}`).join('\n')}
`;

exports.noBPs = (): string => `
  ${chalk.red('No boilerplates installed! 😭')}
`;
