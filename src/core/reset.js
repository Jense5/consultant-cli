// @flow

import rfse from 'fs-extra';
import Promise from 'bluebird';

const fse = Promise.promisifyAll(rfse);

/**
 * Resets the templates folder by removing all of the templates inside it. When the given folder
 * does not exist, it will be created. When it does exist, it will remove all the files and
 * subfolders with rm -rf. The given parameter should not contain a path in `~.*` format or any
 * other format that can not be directly processed by `fs`.
 * @param {string} folder The templates folder location, which should be correctly formatted
 * @returns {Promise<>} A promise when the process will be ready.
 */
const resetBoilerplates = (folder: string): Promise<> => fse.emptyDirAsync(folder);

export default resetBoilerplates;
