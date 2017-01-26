// @flow

import rfse from 'fs-extra';
import klaw from 'klaw';
import path from 'path';
import winston from 'winston';
import useDelims from 'handlebars-delimiters';
import { System } from 'es6-module-loader';
import Promise from 'bluebird';
import Handlebars from 'handlebars';
import inquirer from 'inquirer';

import type { Filter } from './types';
import config from './config';
import utils from './functions';

const fse = Promise.promisifyAll(rfse);

class Consultant {

  filters: Map<string, Filter>;
  source: string;
  start: string;
  root: string;
  end: string;

  input: Object;
  questions: Array<Object>;

  introduction: string;
  summary: (input: Object) => string;

  constructor(root: string): void {
    this.root = root;
    this.filters = new Map();
    this.ask();
    this.setEnd();
    this.setInput();
    this.setStart();
    this.setSummary();
    this.setIntroduction();
    this.setSourceFolder();
  }

  ask(qs: Array<Object> = []): void { this.questions = qs; }
  setIntroduction(intro: string = ''): void { this.introduction = intro; }
  setSummary(summary: (input: Object) => string = () => ''): void { this.summary = summary; }

  setEnd(end: string = '}}'): void { this.end = end; }
  setInput(input: Object = {}): void { this.input = input; }
  setStart(start: string = '{{'): void { this.start = start; }
  setSourceFolder(source: string = 'template'): void { this.source = source; }

  path(): string { return path.resolve(this.root, this.source); }
  filter(file: string, filter: Filter): void { this.filters.set(file, filter); }

  shouldRender(file: string): boolean {
    if (!this.filters.has(file)) { return true; }
    const checker = this.filters.get(file);
    return !!checker && checker(this.input);
  }

  configurationPath(): string { return path.resolve(this.root, config.configurationFile); }

  readTemplateFilePaths(): Promise<Array<string>> {
    return new Promise((resolve, fail) => {
      const items = [];
      klaw(this.path())
      .on('data', (item) => { items.push(item.path); })
      .on('end', () => { resolve(items); })
      .on('error', (error) => { fail(error); });
    });
  }

  renderFile(file: string, output: string): Promise<> {
    return fse.ensureDirAsync(path.dirname(output))
    .then(() => fse.readFileAsync(file, 'utf8'))
    .then(data => Handlebars.compile(data)(this.input))
    .then(data => fse.writeFileAsync(output, data));
  }

  render(output: string): Promise<> {
    return new Promise((resolve) => {
      winston.debug(`Going to build ${this.path()} into ${output}`);
      System.import(this.configurationPath()).then((setup) => {
        setup.default(this);
        useDelims(Handlebars, [this.start, this.end]);
        utils.info(this.introduction);
        inquirer.prompt(this.questions).then((answers) => {
          this.input = answers;
          this.readTemplateFilePaths().then((files) => {
            const filtered = files.filter(file => this.shouldRender(file));
            Promise.map(filtered.filter(file => fse.statSync(file).isFile()), (file) => {
              this.renderFile(file, path.resolve(output, path.relative(this.path(), file)));
            }).then(() => {
              utils.info(this.summary(this.input));
              resolve();
            });
          });
        });
      });
    });
  }

}

module.exports = Consultant;
