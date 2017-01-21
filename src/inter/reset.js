// @flow

import winston from 'winston';
import inquirer from 'inquirer';

import reset from '../core/reset';
import config from '../common/config';
import content from '../common/content';

// eslint-disable-next-line no-console
const info = console.info;

/**
 * Creates a list of questions which should be asked to the user when he wants to reset the
 * boileplates of the templates folder. A list with one element, a confirmation question,
 * will be returned.
 * @return {Array<Object>} Array with questions to ask the user
 */
const confirmation = (): Array<Object> => ([{
  type: 'confirm',
  name: 'sure',
  message: `Sure you want to clear ${config.templateDirectory}?`,
  default: false,
}]);

/**
 * This function is the callback when the user calls the `reset` command. If this is the case, the
 * questions of `confirmation()` should be asked in order to make sure that the user wants to reset
 * the boilerplates. Only reset if this is the case! Returns a promise without parameters.
 * @returns {Promise<>} A promise which will notify when the reset is finished
 */
const resetCommand = () =>
  inquirer.prompt(confirmation()).then((user) => {
    if (user.sure) {
      reset()
      .then(() => info(content.removeSuccess()))
      .catch(winston.error);
    } else {
      info(content.nevermind());
    }
  });

export default resetCommand;
