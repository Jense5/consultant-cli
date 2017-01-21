// @flow

import rfse from 'fs-extra';
import Promise from 'bluebird';

import config from '../common/config';

const fse = Promise.promisifyAll(rfse);

/**
 * Resets the templates folder by removing all of the templates inside it. When the folder
 * does not exist, it will be created. When it does exist, it will remove all the files and
 * subfolders with rm -rf.
 * @returns {Promise<>} A promise when the process will be ready
 */
const resetBoilerplates = (): Promise<> => fse.emptyDirAsync(config.templateDirectory);

export default resetBoilerplates;
