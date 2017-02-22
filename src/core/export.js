// @flow

import _ from 'lodash';
import path from 'path';
import rfse from 'fs-extra';
import Promise from 'bluebird';
import list from './list';

const urlPrefix = 'url = ';
const fse = Promise.promisifyAll(rfse);

/**
 * Fetches the url of the repository if it exists. If it doesn't exist, it returns undefined.
 * @param {string} The absolute path of the config file.
 * @returns {Promise<>} A promise with the url
 */
const fetchRepoURL = absolute =>
  fse.readFileAsync(absolute)
  .then(content => content.toString('utf-8').split('\n'))
  .then(lines => lines.map(e => e.trim()))
  .then(trimmed => trimmed.filter(e => _.startsWith(e, urlPrefix)))
  .then(singleList => (singleList.length > 0 ? singleList[0] : undefined))
  .then(line => (line ? line.replace(urlPrefix, '') : undefined));

/**
 * Exports the installed templates of the consultant boilerplate folder to a valid batch file, which
 * is easy to install on another device (or backup the consultant configuration).
 * @returns {Promise<>} A promise with the batch data
 */
const exportFunction = (): Promise<Array<string>> =>
  new Promise((resolve, fail) => {
    list().then((names) => {
      const abspaths = names.map(name => path.resolve(process.env.templates || '.', name, '.git/config'));
      const realAbsPaths = abspaths.filter(file => fse.existsSync(file));
      Promise.map(realAbsPaths, ap => fetchRepoURL(ap)).then((urls) => {
        resolve({ data: urls.map((url, i) => ({ url, name: names[i] })).filter(e => !!e.url) });
      }).catch(fail);
    }).catch(fail);
  });

export default exportFunction;
