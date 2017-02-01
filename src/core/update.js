// @flow

import path from 'path';
import rfse from 'fs-extra';
import Promise from 'bluebird';
import { exec } from 'child_process';

import list from './list';

const fse = Promise.promisifyAll(rfse);
const execute = Promise.promisify(exec);

/**
 * Pulls in the given folder if it has a .git folder.
 * @param {string} folder The folder to pull
 * @returns {Promise<>} A promise that notifies when the update is finished
 */
const updateBoilerplate = (folder: string): Promise<> =>
  new Promise((resolve, fail) => {
    if (fse.existsSync(path.resolve(folder, '.git'))) {
      execute(`git -C ${folder} pull`).then(resolve).catch(fail);
    } else { resolve(); }
  });

/**
 * Updates the boilerplate with the given name. If no name is given, all boilerplates will be
 * updated (if they have a .git folder).
 * @param {string} name The name of the boilerplate to update
 * @returns {Promise<>} A promise that notifies when all boilerplates are updates
 */
const update = (name?: string): Promise<> =>
  new Promise((resolve, fail) => {
    if (!name) {
      list().then((data) => {
        const locations = data.map(n => path.resolve(process.env.templates || '.', n));
        Promise.map(locations, bp => updateBoilerplate(bp)).then(resolve).catch(fail);
      }).catch(fail);
    } else {
      updateBoilerplate(path.resolve(process.env.templates || '.', name))
      .then(resolve)
      .catch(fail);
    }
  });

export default update;
