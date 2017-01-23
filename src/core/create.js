// @flow

import path from 'path';
import winston from 'winston';
import chalk from 'chalk';
import rfse from 'fs-extra';
import inquirer from 'inquirer';
import Promise from 'bluebird';
import klaw from 'klaw';
import Handlebars from 'handlebars';
import useDelims from 'handlebars-delimiters';
import { System } from 'es6-module-loader';

import utils from '../common/functions';
import config from '../common/config';
import Template from '../common/template';

const fse = Promise.promisifyAll(rfse);


/**
 * Checks if the installed template with given name is a boilerplate are not. For the exact
 * definition of a boilerplate (vs template), please take a look at the documenation on Github.
 * @param {string} name The name of the template to check if it is a boilerplate
 * @returns {boolean} True if and only if the template with given name is a boilerplate
 */
const isBoilerplate = (name: string): boolean =>
  !!name && !fse.existsSync(path.resolve(config.templateDirectory, name, config.configurationFile));

/**
 * Creates a boilerplate with given name in the output directory. If the output directory does not
 * exist, it will be created. The boilerplate with given name should exist, as it is not being
 * checked here. Do never pass the name of a template that does not exist!
 * @param {string} name The name of the boilerplate to create
 * @param {string} output The output location of the boilerplate
 * @returns {Promise<>} A promise that will notify when the creation is finished
 */
const createBoilerplate = (name: string, output: string): Promise<> =>
  fse.ensureDirAsync(output).then(() =>
    fse.copyAsync(path.resolve(config.templateDirectory, name), output));

const readTemplateFilePaths = (template: Template): Promise<Array<string>> =>
  new Promise((resolve, fail) => {
    const items = [];
    klaw(path.resolve(template.root, template.source))
    .on('data', (item) => { items.push(item.path); })
    .on('end', () => { resolve(items); })
    .on('error', (error) => { fail(error); });
  });

const render = (file: string, options: Object, output: string): Promise<> =>
  fse.ensureDirAsync(path.dirname(output))
  .then(() => fse.readFileAsync(file, 'utf8'))
  .then(data => Handlebars.compile(data)(options))
  .then(data => fse.writeFileAsync(output, data));

const createTemplate = (name: string, output: string): Promise<> =>
  new Promise((resolve, fail) => {
    const cfp = path.resolve(config.templateDirectory, name, config.configurationFile);
    utils.info(chalk.blue(cfp));
    System.import(cfp).then((setup) => {
      const template = new Template(path.resolve(config.templateDirectory, name));
      setup.default(template);
      useDelims(Handlebars, [template.delimiters.start, template.delimiters.end]);
      inquirer.prompt(template.questions)
      .then((answers) => {
        utils.info(template.introduction(answers));
        readTemplateFilePaths(template)
        .then((files) => {
          Promise.map(files.filter(file => fse.statSync(file).isFile()), (file) => {
            render(file, answers, path.resolve(output, path.relative(template.path(), file)));
          }).then(resolve);
        });
      });
    }).catch(fail);
  });

/**
 * Creates a new project from the template with given name. The function supposes that the template
 * already exists, so checking making sure this is correct should be done before this function is
 * called. It will detect whether it is a template or boilerplate and react accordingly. It is not
 * necessary for the ouput directory to exist.
 * @param {string} name The name of the template to create
 * @param {string} output The output of directory of the new project
 * @returns {Promise<>} A promise that will notify when the creation is finished
 */
const create = (name: string, output: string): Promise<> =>
  new Promise((resolve, fail) => {
    if (isBoilerplate(name)) {
      createBoilerplate(name, output)
      .then(resolve)
      .catch(fail);
    } else {
      createTemplate(name, output)
      .then(resolve)
      .catch(winston.error);
    }
  });

export default create;
