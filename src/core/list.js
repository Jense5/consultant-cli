// @flow

import path from 'path';
import rfse from 'fs-extra';
import Promise from 'bluebird';

import config from '../common/config';

const fse = Promise.promisifyAll(rfse);

/**
 * Lists the templates folder by name. Returns a Promise<Array<string>> with the names. It does
 * not check if the templates are valid. It just returns the names of the templates located.
 * @returns {Promise<>} A promise with the names
 */
const list = (): Promise<Array<string>> =>
  new Promise((resolve) => {
    fse.readdirAsync(config.templateDirectory).then((files) => {
      const abspaths = files.map(file => path.resolve(config.templateDirectory, file));
      Promise.map(abspaths, ap => fse.statAsync(ap)).then((results) => {
        const data = results.map((v, i) => ({ k: abspaths[i], v: v.isDirectory() }));
        const dirs = data.filter(e => e.v).map(e => path.basename(e.k));
        resolve(dirs);
      });
    });
  });

export default list;
