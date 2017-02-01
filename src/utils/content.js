// @flow

import chalk from 'chalk';

exports.invalidCommand = (): string =>
`${chalk.red('Invalid parameters: no / invalid command specified.')}
Check the docs: ${chalk.cyan('http://consultant.js.org')}.`;

exports.startBatch = (uri: string) =>
`Starting batch for ${uri}.`;

exports.startClone = (url: string): string =>
`Starting to clone ${chalk.cyan(url)}.`;

exports.startCopy = (path: string): string =>
`Starting to copy ${path}.`;

exports.unableToClone = (): string =>
`${chalk.red('Unable to clone repository.')}
Make sure that it is a valid git repository.
If you can't \`git clone\` it, it's invalid.`;

exports.unableToCopy = (): string =>
`${chalk.red('Unable to copy boilerplate.')}
Make sure the given folder does exist.
If you provided an online link, it wasn't detected.
Please report an issue: ${chalk.cyan('https://github.com/Jense5/consultant/issues')}`;

exports.installedTemplate = (name: string): string =>
`Installed '${name}'.`;

exports.noUrl = (): string =>
`${chalk.red('No url provided.')}`;

exports.listTemplates = (names: Array<string> = []): string =>
  (names.length > 0 ?
`${'Boilerplates:'}
${names.map(name => `- '${name}'`).join('\n')}` :
`${'No templates installed.'}`);

exports.help = () =>
`The valid commands in this version:
add - batch - create - help - list - remove - reset - snapshot - update
Check the docs: ${chalk.cyan('http://consultant.js.org')}
Report issue: ${chalk.cyan('https://github.com/Jense5/consultant/issues')}`;

exports.templateAlreadyExists = (input: string) => `Template '${input}' already exists.`;
exports.templateNotInstalled = (input: string) => `Template '${input}' not installed.`;
exports.removedTemplate = (name: string): string => `Removed '${name}'.`;
exports.resetSuccess = (): string => 'I removed all boilerplates.';
exports.nevermind = (): string => 'Ok, nevermind.';

exports.resolveFor = (o: string) => `Please resolve naming conflict for ${o}...`;
exports.invalidBatch = () => `${chalk.red('Batch does not exist or is invalid.')}`;
exports.done = () => 'Finished.';
