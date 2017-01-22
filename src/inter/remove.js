// @flow

import winston from 'winston';

import remove from '../core/remove';
import utils from '../common/functions';
import content from '../common/content';

/**
 * Function to remove the given template. If the given name is invalid, a new one is asked until
 * the user provides a valid one.
 * @param {string} name The name that is provided by the user
 * @returns {Promise<>} A promise which will notify when the remove is finished
 */
const removeCommand = (name: string): Promise<> =>
  utils.ensureTemplatesInstalled().then(() => {
    utils.ensureExistingTemplateName(name, 'Which template would you like to remove?')
    .then(validated => remove(validated))
    .then(() => utils.info(content.removedTemplate()))
    .catch(winston.error);
  }).catch(() => utils.info(content.listTemplates()));

export default removeCommand;
