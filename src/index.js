#!/usr/bin/env node

// @flow

import rfs from 'fs';
import path from 'path';
import chalk from 'chalk';
import winston from 'winston';
import commander from 'commander';
import untildify from 'untildify';

import remove from './inter/remove';
import content from './content';
import list from './inter/list';
import add from './add';
import reset from './inter/reset';
import create from './create';

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
  info(content.invalidCommand());
  winston.debug(`${chalk.red('No command specified')} - Bye!`);
  process.exit();
} else {
  switch (commander.args[0].toUpperCase()) {
    case 'ADD':
      if (commander.args.length < 2) {
        info(chalk.red.bold('\n    No link provided! 🤦‍\n'));
        winston.debug(`${chalk.red('No link provided!')} - Bye!`);
        process.exit();
      }
      add(commander.args[1], conf.templates);
      break;
    case 'CREATE':
      create(destination, conf.templates);
      break;
    case 'RESET':
      reset(conf.templates);
      break;
    case 'LIST':
      list(conf.templates);
      break;
    case 'REMOVE':
      remove(conf.templates, ...commander.args.slice(1));
      break;
    default:
      info(content.invalidCommand());
      winston.debug(`${chalk.red('Invalid command specified')} - Bye!`);
      process.exit();
  }
}
