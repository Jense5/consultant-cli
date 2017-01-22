// @flow

import winston from 'winston';

import remove from '../core/remove';
import utils from '../common/functions';
import content from '../common/content';

/**
 * Function to remove the given template. If the given name is invalid, a new one is asked until
 * the user provides a valid one.
 * @param {string} name The name that is provided by the user
 */
const removeCommand = (name: string) =>
  utils.ensureTemplatesInstalled().then(() => {
    utils.ensureExistingTemplateName(name, 'Which module would you like to remove?')
    .then(validated => remove(validated))
    .then(() => utils.info(content.removedTemplate()))
    .catch(winston.error);
  }).catch(() => utils.info(content.listTemplates()));

export default removeCommand;
