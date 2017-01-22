// @flow

import winston from 'winston';

import create from '../core/create';
import utils from '../common/functions';
import content from '../common/content';

/**
 * Creates a new project from the template with given name. If a template with the given name does
 * not exist, a new one will be asked until it is valid. It is not necessary for the ouput
 * directory to exist.
 * @param {string} name The name of the template to create
 * @param {string} output The output of directory of the new project
 * @param {Promise<>} A promise that will notify when it is done
 */
const createCommand = (name: string, output: string = process.cwd()): Promise<> =>
  utils.ensureTemplatesInstalled().then(() => {
    utils.ensureExistingTemplateName(name, 'Which template would you like to use?')
    .then(validated => create(validated, output))
    .then(() => utils.info(content.createdTemplate()))
    .catch(winston.error);
  }).catch(() => utils.info(content.listTemplates()));

export default createCommand;
