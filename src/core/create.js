// @flow

import path from 'path';
import rfse from 'fs-extra';
import Promise from 'bluebird';

const fse = Promise.promisifyAll(rfse);

/**
 * Lists the templates folder by name. Returns a Promise<Array<string>> with the names. It does
 * not check if the boilerplates are valid. It just returns the names of the boilerplates located.
 * @param {string} folder The templates folder location, which should be correctly formatted
 * @returns {Promise<>} A promise with the names
 */
const list = (folder: string): Promise<Array<string>> =>
  new Promise((resolve, fail) => {
    fse.readdirAsync(folder).then((files) => {
      const abspaths = files.map(file => path.resolve(folder, file));
      Promise.map(abspaths, ap => fse.statAsync(ap)).then((results) => {
        const data = results.map((v, i) => ({ k: abspaths[i], v: v.isDirectory() }));
        const dirs = data.filter(e => e.v).map(e => path.basename(e.k));
        resolve(dirs);
      });
    }).catch(fail);
  });

export default list;
