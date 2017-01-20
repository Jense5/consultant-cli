#!/usr/bin/env node

// @flow

{{#if lodash}}
// import _ from 'lodash';

{{/if}}

{{#if commander}}
import fs from 'fs';
import path from 'path';
{{/if}}
import chalk from 'chalk';
import winston from 'winston';{{#if cheerio}}
import cheerio from 'cheerio';
import request from 'request';{{/if}}{{#if commander}}
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
{{#if cheerio}}

request('https://news.ycombinator.com', (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html);
    winston.info(chalk.green('Scraper is ready!'));
    winston.info('I scraped HackerNews as an example:');
    $('a.storylink').each((i, element) => {
      winston.info(`${chalk.cyan('Title: ')} ${$(element).text()}`);
    });
  }
});
{{/if}}
