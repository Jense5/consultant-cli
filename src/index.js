#!/usr/bin/env node

// @flow

import rfs from 'fs';
import path from 'path';
import chalk from 'chalk';
import winston from 'winston';
import commander from 'commander';
import untildify from 'untildify';

import remove from './inter/remove';
import content from './common/content';
import add from './inter/add';
import create from './inter/create';
import snapshot from './inter/snapshot';

import list from './inter/list';
import reset from './inter/reset';

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
.option('-n, --name [name]', 'name of boilerplate to add')
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
      add(...commander.args.slice(1)).catch(winston.error);
      break;
    case 'CREATE':
      create(...commander.args.slice(1));
      break;
    case 'RESET':
      reset().catch(winston.error);
      break;
    case 'LIST':
      list().catch(winston.error);
      break;
    case 'REMOVE':
      remove(...commander.args.slice(1)).catch(winston.error);
      break;
    case 'SNAPSHOT':
      snapshot(conf.templates, ...commander.args.slice(1));
      break;
    default:
      info(content.invalidCommand());
      winston.debug(`${chalk.red('Invalid command specified')} - Bye!`);
      process.exit();
  }
}
