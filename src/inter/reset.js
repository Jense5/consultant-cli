// @flow

import winston from 'winston';
import inquirer from 'inquirer';

import reset from '../core/reset';
import utils from '../utils/utils';
import content from '../utils/content';

/**
 * Creates a list of questions which should be asked to the user when he wants to reset the
 * boileplates of the templates folder. A list with one element, a confirmation question,
 * will be returned.
 * @return {Array<Object>} Array with questions to ask the user
 */
const confirmation = (): Array<Object> => ([{
  type: 'confirm',
  name: 'sure',
  message: `Sure you want to clear ${process.env.templates || '.'}?`,
  default: false,
}]);

/**
 * This function is the callback when the user calls the `reset` command. If this is the case, the
 * questions of `confirmation()` should be asked in order to make sure that the user wants to reset
 * the boilerplates. Only reset if this is the case! Returns a promise without parameters.
 * @returns {Promise<>} A promise which will notify when the reset is finished
 */
const resetCommand = (): Promise<> =>
  inquirer.prompt(confirmation()).then((user) => {
    if (user.sure) {
      reset()
      .then(() => utils.info(content.removeSuccess()))
      .catch(winston.error);
    } else {
      utils.info(content.nevermind());
    }
  });

export default resetCommand;
