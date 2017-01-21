// @flow

import _ from 'lodash';
import inquirer from 'inquirer';

import config from './config';
import content from './content';
import list from '../core/list';

// eslint-disable-next-line no-console
const info = console.info;
exports.info = info;

/**
 * Returns a promise that will resolve when there are templates installed, fail if there
 * are none. This is when the `list` actions returns zero elements.
 * @returns {Promise<>} A promise which resolves if there are install templates
 */
exports.ensureTemplatesInstalled = (): Promise<> =>
  new Promise((resolve, fail) => {
    list(config.templateDirectory).then((names) => {
      if (names.length < 1) { fail(); }
      if (names.length > 0) { resolve(); }
    });
  });

/**
 * Validates if the given input is in the list of names or not. If it is, it will return the error
 * message. If it is not, it will return true.
 * @returns {mixed} An error message (string) or true (boolean)
 */
const validateNew = (names: Array<string>, input: string) =>
  (_.includes(names, input) ? content.templateAlreadyExists(input) : true);

/**
 * Validates if the given input is in the list of names or not. If it is not, it will return the
 * error message. If it is, it will return true.
 * @returns {mixed} An error message (string) or true (boolean)
 */
const validateOld = (names: Array<string>, input: string) =>
  (_.includes(names, input) ? true : content.templateNotInstalled(input));

/**
 * Returns a list of questions that should be asked in order for the user to choose a valid
 * template name. The given message will appear as the question and the given names will be used
 * to validate the answer. The existing boolean determines if the answer should be in the names
 * list or not.
 * @param {string} message The message to appear as the question
 * @param {Array<string>} names The names of the templates that are installed
 * @param {boolean} existing Boolean representing whether or not the user should choose an existing
 *                           name or a new name.
 */
const askForTemplate = (message: string, names: Array<string>, existing: boolean = true) => ([{
  validate: input => (existing ? validateOld(names, input) : validateNew(names, input)),
  type: 'input',
  name: 'name',
  message,
}]);

/**
 * Returns a promise with the name that the user enters. This name will always be valid as this
 * function will keep asking until the name is valid. The given name is the already provided one,
 * so if this one is valid, then nothing will be asked. The message will be the message that
 * appears as the question. The existing boolean parameters is used to check if the input is valid.
 * If this one is true, then the input should be an existing name of a template. If it is false,
 * it will should be a non existing name.
 * @param {name} name The already provided input of the user (undefined if none)
 * @param {string} message The message to appear as the question
 * @param {boolean} existing Boolean representing whether or not the user should choose an existing
 *                           name or a new name.
 */
const ensureTemplateName = (name: string, message: string, existing: boolean): Promise<string> =>
  new Promise((resolve) => {
    list(config.templateDirectory).then((names) => {
      const incl = _.includes(names, name);
      if (!name || ((incl || existing) && !(incl && existing))) {
        info(content.listTemplates(names));
        inquirer.prompt(askForTemplate(message, names, existing))
        .then(answer => resolve(answer.name));
      } else { resolve(name); }
    });
  });

/**
 * Returns a promise with the name that the user enters. This name will always be valid as this
 * function will keep asking until the name is valid. The given name is the already provided one,
 * so if this one is valid, then nothing will be asked. The message will be the message that
 * appears as the question. The name that is resolved should be of an existing template.
 * @param {name} name The already provided input of the user (undefined if none)
 * @param {string} message The message to appear as the question
 */
exports.ensureExistingTemplateName = (name: string, message: string): Promise<string> =>
  ensureTemplateName(name, message, true);

/**
 * Returns a promise with the name that the user enters. This name will always be valid as this
 * function will keep asking until the name is valid. The given name is the already provided one,
 * so if this one is valid, then nothing will be asked. The message will be the message that
 * appears as the question. The name that is resolved should be of a non-existing template.
 * @param {name} name The already provided input of the user (undefined if none)
 * @param {string} message The message to appear as the question
 */
exports.ensureNonExistingTemplateName = (name: string, message: string): Promise<string> =>
  ensureTemplateName(name, message, false);
