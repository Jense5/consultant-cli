// @flow

import winston from 'winston';
import inquirer from 'inquirer';

import reset from '../core/reset';
import content from '../content';

// eslint-disable-next-line no-console
const info = console.info;

/**
 * Creates a list of questions which should be asked to the user when he wants to reset the
 * boileplates of the given templates folder. A list with one element, a confirmation question,
 * will be returned.
 * @param {string} folder The path of the templates directory to reset
 * @return {Array<Object>} Array with questions to ask the user
 */
const confirmation = (folder: string): Array<Object> => ([{
  type: 'confirm',
  name: 'sure',
  message: `Sure you want to clear ${folder}?`,
  default: false,
}]);

/**
 * This function is the callback when the user calls the `reset` command. If this is the case, the
 * questions of `confirmation()` should be asked in order to make sure that the user wants to reset
 * the boilerplates. Only reset if this is the case!
 * @param {string} folder The path of the templates directory
 */
const resetCommand = (folder: string) =>
  inquirer.prompt(confirmation(folder)).then((user) => {
    if (user.sure) {
      reset(folder)
      .then(() => info(content.removeSuccess()))
      .catch(winston.error);
    } else {
      info(content.nevermind());
    }
  });

export default resetCommand;
