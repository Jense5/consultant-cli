// @flow

import path from 'path';
import validUrl from 'valid-url';
import Promise from 'bluebird';

import add from '../core/add';
import utils from '../utils/utils';
import content from '../utils/content';

/**
 * Adds the online repository to the local template folder as a template with the given name.
 * All parameters should already be verified.
 * @param {string} uri The url to clone the repository from
 * @param {string} name The name of the local template
 * @returns {Promise<>} A promise which will notify when the cloning is finished
 */
const addOnline = (uri: string, validated: string): Promise<> =>
  new Promise((resolve) => {
    utils.info(content.startClone());
    add.online(uri, validated).then(() => {
      utils.info(content.installedTemplate(validated));
      resolve();
    }).catch(() => {
      utils.info(content.unableToClone());
    });
  });

/**
 * Adds the local folder to the local template folder as a template with the given name.
 * All parameters should already be verified.
 * @param {string} uri The folder path to copy the template from
 * @param {string} name The name of the local template
 * @returns {Promise<>} A promise which will notify when the copy action is finished
 */
const addLocal = (uri: string, validated: string): Promise<> =>
  new Promise((resolve) => {
    utils.info(content.startCopy());
    add.local(path.resolve(process.cwd(), uri), validated).then(() => {
      utils.info(content.installedTemplate(validated));
      resolve();
    }).catch(() => {
      utils.info(content.unableToCopy());
    });
  });

/**
 * Adds the given uri to the templates folder, with the given name. This can be an online
 * repo or an offline folder.
 * @param {string} uri The location (online or offline) of the template
 * @param {string} name The name of the template.
 * @returns {Promise<>} A promise which will notify when the list is finished
 */
const addCommand = (uri: string, name: string): Promise<> =>
  new Promise((resolve) => {
    if (uri) {
      utils.ensureNonExistingTemplateName(name, 'How would you like to call the template?')
      .then((validated) => {
        if (validUrl.isWebUri(uri)) { addOnline(uri, validated).then(resolve); }
        if (!validUrl.isWebUri(uri)) { addLocal(uri, validated).then(resolve); }
      });
    } else { utils.info(content.noUrl()); }
  });

export default addCommand;
