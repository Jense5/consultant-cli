// @flow

import _ from 'lodash';
import winston from 'winston';
import inquirer from 'inquirer';

import remove from '../core/remove';
import list from '../core/list';
import content from '../content';

// eslint-disable-next-line no-console
const info = console.info;

/**
 * Generates the question that should be asked to make sure the user wants to delete the correct
 * boilerplate. The answer he gives should also be in the given list of templates.
 * @param {Array<string>} names The valid modules which the user can remove
 * @return {Array<Object>} The questions to be passed to the inquirer module
 */
const nameInquirer = (names: Array<string>): Array<Object> => ([{
  type: 'input',
  name: 'name',
  message: 'Which module would you like to remove?',
  validate: input => (_.includes(names, input) ? true : `Boilerplate '${input}' not installed! 😕`),
}]);

/**
 * Function to make sure that there are boilerplates installed.
 * @param {string} folder The folder which should contain the boilerplates
 * @returns {Promise<>} Only succeeds when the given template folder has boilerplates
 */
const makeSureThereAreBPs = (folder: string): Promise<> =>
  new Promise((resolve, reject) => {
    list(folder)
    .then((names) => {
      if (names.length < 1) { reject(); }
      if (names.length > 0) { resolve(); }
    });
  });

/**
 * Function to make sure that the given boilerplate name exists.
 * @param {string} folder The folder which should contain the boilerplates
 * @param {string} template The name that is provided by the user
 * @returns {Promise<>} Only succeeds when the given template folder has boilerplates
 */
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

/**
 * Function to remove the given boilerplate. If the given name is invalid, a new one is asked.
 * @param {string} folder The folder which should contain the boilerplates
 * @param {string} template The name that is provided by the user
 */
const removeCommand = (folder: string, template: string) => {
  makeSureThereAreBPs(folder)
  .then(() => {
    makeSureNameIsSet(folder, template)
    .then(name => remove(folder, name))
    .then(() => info(content.removedBP()))
    .catch(winston.error);
  }).catch(() => info(content.listBPs([])));
};

export default removeCommand;
