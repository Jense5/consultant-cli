// @flow

import chalk from 'chalk';

exports.invalidURI = () => `
  ${chalk.red('Invalid URI provided! 🤦‍')}

  Don't worry, I'm sure you will be able to figure it out!
`;

exports.duplicateName = () => `
  ${chalk.red('Boilerplate name is already in use! 🤦‍')}

  Please provide a custom name for the boilerplate with the --name option.
`;

exports.removeSuccess = () => `
  ${chalk.cyan('Ok')}, I removed all boilerplates! 👌
`;

exports.nevermind = () => `
  ${chalk.cyan('Ok')}, nevermind! 👌
`;
