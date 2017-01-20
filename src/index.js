#!/usr/bin/env node

// @flow

import rfs from 'fs';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment';
import winston from 'winston';
import Promise from 'bluebird';
import inquirer from 'inquirer';
import commander from 'commander';
import untildify from 'untildify';

import questions from './questions';
import createBoilerplate from './boilerplate';

const fs = Promise.promisifyAll(rfs);


// eslint-disable-next-line no-console
const info = console.info;


// Load the default package configuration
const pkg = path.resolve(__dirname, '../package.json');
const pack = JSON.parse(rfs.readFileSync(pkg, 'utf8'));


// Set the default configuration parameters
const DEFAULTS = { templates: '~/.cst-templates' };


// Parse the command line arguments
commander
.version(pack.version)
.usage('<command> [options]')
.option('-d, --debug', 'debug mode')
.option('-o, --output [output]', 'output directory')
.parse(process.argv);


// Set the level of winston
if (commander.debug) { winston.level = 'debug'; }
winston.debug(chalk.yellow('Processed arguments!'));


// Setup default configuration or load existing one
let cff = {};
const CONF = '~/.cst.conf';
if (rfs.existsSync(untildify(CONF))) { cff = JSON.parse(rfs.readFileSync(untildify(CONF), 'utf8')); }
const conf = Object.assign({}, DEFAULTS, cff);
conf.templates = untildify(conf.templates);
winston.debug(`${chalk.green('Loaded configuration:')} ${JSON.stringify(conf)}`);


// Parsing template directory from configuration
if (!rfs.existsSync(conf.templates)) { rfs.mkdirSync(conf.templates); }
winston.debug(`Choosing ${chalk.blue(conf.templates)} as template directory`);


// Parsing output directory from command line arguments
const output = commander.output || '';
const destination = path.resolve(process.cwd(), output);
winston.debug(`Choosing ${chalk.cyan(destination)} as output directory`);


// Process the correct command and link it to the correct callback
if (commander.args.length < 1) {
  info(`
    ${chalk.red.bold('Invalid use of Consultant 🤦‍')}
    No command specified!

    Please use one of the commands below:
    create - add - remove - snapshot - help

    For more information, hit me up on Github or check the documentation:
    ${chalk.cyan('https://github.com/Jense5/consultant')}
    `);
  winston.debug(`${chalk.red('No command specified')} - Bye!`);
  process.exit();
} else {
  switch (commander.args[0].toUpperCase()) {
    case 'HELLO':
      info('ja');
      break;
    default:
      info(chalk.red.bold('\n    Invalid command! 🤦‍\n'));
      winston.debug(`${chalk.red('Invalid command')} - Bye!`);
      process.exit();
  }
}
/*

// Load the possible templates the user can choose and ask for one
fs.readdirAsync(conf.templates).then((files) => {
  const names = files.map(file => path.resolve(conf.templates, file));
  Promise.map(names, name => fs.statAsync(name)).then((results) => {
    const data = results.map((v, i) => ({ k: names[i], v: v.isFile() }));
    const cd = data.filter(e => !e.v).map(e => path.resolve(path.dirname(conf.templates), e.k));
    if (cd.length > 0) {
      inquirer.prompt([{
        type: 'list',
        name: 'template',
        message: 'Choose your boilerplate',
        choices: cd.map(n => path.basename(n)),
      }]).then((answer) => {
        info(`Ok, ${chalk.magenta(answer.template)} it is then!`);
      });
    } else { info(chalk.red('No boilerplates installed! 😭')); }
  });
});

/*
inquirer.prompt(questions).then((result) => {
  const answers = result;
  result.modules.forEach((module) => { answers[module] = true; });
  winston.debug('Processed answers');
  info('Crafting toolkit...');
  const start = moment.utc();
  createBoilerplate(path.resolve(__dirname, '../template'), answers, destination)
  .then(() => {
    const time = parseFloat(moment.utc().diff(start)) / 1000.00;
    info(`Created app in ${chalk.green(`${time.toFixed(3)}s`)}!`);
    info(chalk.cyan('✨  Done, happy coding! 🎉'));
  }).catch(winston.error);
});
*/
