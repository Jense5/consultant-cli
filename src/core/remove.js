// @flow

import path from 'path';
import rfse from 'fs-extra';
import Promise from 'bluebird';

import config from '../common/config';

const fse = Promise.promisifyAll(rfse);

/**
 * Removes the template with given name from the template folder. If the template does not
 * exist, this function will also succeed.
 * @param {string} name The name of the template to remove
 * @returns {Promise<>} A promise when the remove action is finished
 */
const remove = (name: string): Promise<> =>
  fse.removeAsync(path.resolve(config.templateDirectory, name));

export default remove;
