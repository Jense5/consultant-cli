// @flow

import winston from 'winston';

import utils from '../utils/utils';
import remove from '../core/remove';
import content from '../utils/content';

/**
 * Function to remove the given template. If the given name is invalid, a new one is asked until
 * the user provides a valid one.
 * @param {string} name The name that is provided by the user
 * @returns {Promise<>} A promise which will notify when the remove is finished
 */
const removeCommand = (name: string): Promise<> => {
  let temp = name;
  return utils.ensureTemplatesInstalled().then(() => {
    utils.ensureExistingTemplateName(name, 'Which template would you like to remove?')
    .then((validated) => {
      temp = validated;
      return remove(validated);
    }).then(() => utils.info(content.removedTemplate(temp)))
    .catch(winston.error);
  }).catch(() => utils.info(content.listTemplates()));
};

export default removeCommand;
