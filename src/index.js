// @flow

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment';
import winston from 'winston';
import inquirer from 'inquirer';
import commander from 'commander';

import render from './render';
import questions from './questions';

// eslint-disable-next-line no-console
const info = console.info;

const pkg = path.resolve(__dirname, '../package.json');
const conf = JSON.parse(fs.readFileSync(pkg, 'utf8'));

commander
.version(conf.version)
.option('-d, --debug', 'Debug mode')
.option('-s, --sample', 'Add sample')
.parse(process.argv);

if (commander.debug) { winston.level = 'debug'; }
winston.debug('Processed arguments');

inquirer.prompt(questions).then((answers) => {
  winston.debug('Processed answers');
  info(chalk.gray('Crafting toolkit...'));
  const start = moment.utc();
  render('README.md', answers).then(() => {
    const time = parseFloat(moment.utc().diff(start)) / 1000.00;
    info(`${chalk.gray('Created app in')} ${chalk.green(`${time.toFixed(3)}s`)}${chalk.gray('!')}`);
    info(chalk.cyan('✨  Done, happy coding! 🎉'));
  });
});
