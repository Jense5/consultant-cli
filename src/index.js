#!/usr/bin/env node

// @flow

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import moment from 'moment';
import winston from 'winston';
import inquirer from 'inquirer';
import commander from 'commander';

import transfer from './transfer';
import questions from './questions';

// eslint-disable-next-line no-console
const info = console.info;

// Load the default package configuration
const pkg = path.resolve(__dirname, '../package.json');
const conf = JSON.parse(fs.readFileSync(pkg, 'utf8'));

commander
.version(conf.version)
.usage('[options]')
.option('-d, --debug', 'Debug mode')
.option('-o, --output [output]', 'Output directory')
.parse(process.argv);

if (commander.debug) { winston.level = 'debug'; }
winston.debug('Processed arguments');

const output = commander.output || '';
const destination = path.resolve(process.cwd(), output);
winston.debug(`Choosing ${destination} as output directory`);

mkdirp(destination, (error) => {
  if (error) { winston.error(chalk.red('✗ Unable to create directory!')); }
  inquirer.prompt(questions).then((result) => {
    const answers = result;
    result.modules.forEach((module) => { answers[module] = true; });
    winston.debug('Processed answers');
    info('Crafting toolkit...');
    const start = moment.utc();
    transfer(answers, destination).then(() => {
      const time = parseFloat(moment.utc().diff(start)) / 1000.00;
      info(`Created app in ${chalk.green(`${time.toFixed(3)}s`)}!`);
      info(chalk.cyan('✨  Done, happy coding! 🎉'));
    }).catch(winston.error);
  });
});
