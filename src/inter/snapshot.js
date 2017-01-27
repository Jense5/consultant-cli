// @flow

import add from '../core/add';
import utils from '../utils/utils';
import content from '../utils/content';

/**
 * Adds the given current working directory to the templates folder, with the given name.
 * @param {string} name The name of the template.
 * @returns {Promise<>} A promise which will notify when the list is finished
 */
const snapshotCommand = (name: string): Promise<> =>
  utils.ensureNonExistingTemplateName(name, 'How would you like to call the template?')
  .then((validated) => {
    utils.info(content.startCopy(process.cwd()));
    return add.local(process.cwd(), validated)
    .then(() => utils.info(content.installedTemplate(validated)));
  }).catch(() => utils.info(content.unableToCopy()));

export default snapshotCommand;
