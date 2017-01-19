// @flow

import rfs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import Promise from 'bluebird';

const fs = Promise.promisifyAll(rfs);
const mkdir = Promise.promisify(mkdirp);

/**
 * Writes the given data to the file at the given location. If the file or folder structure does
 * not exist, it will be created. A promise without parameters will be returned.
 * @param {string} location The location of the output file.
 * @param {string} data The data to write to the file.
 * @returns {Promise<>} A promise without parameters.
 */
const write = (location: string, data: string): Promise<> =>
  new Promise((resolve, reject) => {
    mkdir(path.dirname(location))
    .then(() => resolve(fs.writeFileAsync(location, data)))
    .catch(reject);
  });

export default write;
