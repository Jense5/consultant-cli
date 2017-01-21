// @flow

import path from 'path';
import rfse from 'fs-extra';
import Promise from 'bluebird';

const fse = Promise.promisifyAll(rfse);

/**
 * Removes the template with given name from the given template folder. If the template does not
 * exist, this function will also succeed.
 * @param {string} folder The location of the boilerplates folder
 * @param {string} name The name of the boilerplate to remove
 * @returns {Promise<>} A Promise when the remove action is finished
 */
const remove = (folder: string, name: string): Promise<> =>
  fse.removeAsync(path.resolve(folder, name));

export default remove;
