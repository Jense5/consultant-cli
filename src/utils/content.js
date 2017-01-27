// @flow

import chalk from 'chalk';

exports.invalidCommand = (): string => `
${chalk.red.bold('Invalid use of Consultant 🤦‍')}
No / invalid command specified!

Please use one of the commands below:
create - add - remove - snapshot - list - reset - help

For more information, find me on Github or check the documentation:
${chalk.cyan('https://jense5.github.io/consultant')}
`;

exports.startBatch = (uri: string) => `
Starting batch for ${chalk.cyan(uri)}.`;

exports.startClone = (url: string): string => `
Starting to clone ${chalk.magenta(url)}.`;

exports.startCopy = (path: string): string => `
Starting to copy ${chalk.magenta(path)}.`;

exports.unableToClone = (): string => `
${chalk.red('Unable to clone this repository!')}
Make sure that it is a valid git repository to clone.
If you can't \`git clone\` it, it's invalid. 🤓
`;

exports.unableToCopy = (): string => `
${chalk.red('Unable to copy this boilerplate!')}
Make sure the given folder does exist.
If you provided an online link, it wasn't detected. 🐞
Please report an issue here:
${chalk.cyan('https://github.com/Jense5/consultant/issues')}
`;

exports.installedTemplate = (name: string): string =>
`Installed ${chalk.cyan(name)}! 🤞
`;

exports.noUrl = (): string => `
${chalk.red('No url provided! 🤦‍')}
`;

exports.listTemplates = (names: Array<string> = []): string =>
  (names.length > 0 ? `
${chalk.cyan('List of installed templates:')}
${names.map(name => `    - ${name}`).join('\n')}
` : `
${chalk.red('No templates installed! 😔')}
`);

exports.help = () => `
Welcome to consultant! 🎉

If you are new to this tool, I advise you to checkout the quickstart:
${chalk.cyan('https://jense5.github.io/consultant')}

In this version, you can use the following commands:
create - add - snapshot - list - remove - reset - help

Problems, questions, or just want to share some thoughts? 🤔
${chalk.cyan('https://github.com/Jense5/consultant/issues')}

Have fun! 🍻
`;

exports.removedTemplate = (name: string): string => `
${chalk.red(`I removed ${chalk.bold(name)}`)} 🤘
`;

exports.resetSuccess = (): string => `
${chalk.red('I removed all boilerplates!')} 👌
`;

exports.nevermind = (): string => `
Ok, ${chalk.cyan('nevermind')}! 👌
`;

exports.templateAlreadyExists = (input: string) => `Template '${input}' already exists! 😕`;
exports.templateNotInstalled = (input: string) => `Template ${input} not installed! 😕`;

exports.resolveFor = (o: string) =>
`Please resolve naming conflict for ${chalk.red(o)}...`;

exports.invalidBatch = () => `
${chalk.red('Batch does not exist or is invalid!')} 😕
`;

exports.done = () => `
Done!
`;
