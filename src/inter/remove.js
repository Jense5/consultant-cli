// @flow

import _ from 'lodash';
import winston from 'winston';
import inquirer from 'inquirer';

import remove from '../core/remove';
import list from '../core/list';
import content from '../content';

// eslint-disable-next-line no-console
const info = console.info;

const nameInquirer = (names: Array<string>): Array<Object> => ([{
  type: 'input',
  name: 'name',
  message: 'Which module would you like to remove?',
  validate: input => (_.includes(names, input) ? true : `Boilerplate '${input}' not installed! 😕`),
}]);

const makeSureThereAreBPs = (folder: string): Promise<> =>
  new Promise((resolve, reject) => {
    list(folder)
    .then((names) => {
      if (names.length < 1) { reject(); }
      if (names.length > 0) { resolve(); }
    });
  });

const makeSureNameIsSet = (folder: string, template: string): Promise<string> =>
  new Promise((resolve) => {
    list(folder)
    .then((names) => {
      if (!_.includes(names, template)) {
        info(content.listBPs(names));
        inquirer.prompt(nameInquirer(names))
        .then(answer => resolve(answer.name));
      } else { resolve(template); }
    });
  });

const removeCommand = (folder: string, template: string) => {
  makeSureThereAreBPs(folder)
  .then(() => {
    makeSureNameIsSet(folder, template)
    .then(name => remove(folder, name))
    .then(() => info(content.removedBP()))
    .catch(winston.error);
  }).catch(() => info(content.noBPs()));
};

export default removeCommand;
