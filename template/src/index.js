// @flow

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import winston from 'winston';{{#if commander}}
import commander from 'commander';{{/if}}

{{#if commander}}
const pkg = path.resolve(__dirname, '../package.json');
const conf = JSON.parse(fs.readFileSync(pkg, 'utf8'));

commander
.version(conf.version)
.option('-s, --sample', 'Add sample')
.parse(process.argv);

{{/if}}
winston.info(`${chalk.green('Hello world!')}`);{{#if commander}}
if (commander.sample) { winston.info(`${chalk.blue('Sample: ')} true`); }{{/if}}
