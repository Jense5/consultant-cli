// @flow

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import winston from 'winston';
import inquirer from 'inquirer';
import commander from 'commander';

import render from './render';
import questions from './questions';

const pkg = path.resolve(__dirname, '../package.json');
const conf = JSON.parse(fs.readFileSync(pkg, 'utf8'));

commander
.version(conf.version)
.option('-s, --sample', 'Add sample')
.parse(process.argv);

inquirer.prompt(questions).then((answers) => {
  render('README.md', answers).then((data) => {
    winston.info(data);
    winston.info(chalk.green('Bye!'));
  });
});
