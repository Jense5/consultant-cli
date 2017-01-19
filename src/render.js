// @flow

import rfs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import handlebars from 'handlebars';

const fs = Promise.promisifyAll(rfs);

/**
 * Renders the file with given name with the given options. It will use a default handlebars
 * parsers and locates the given filename at path.resolve(__dirname, '../template', name).
 * It returns a promise with the templated data as a parameter.
 * @param {string} name The name of the file (aka relative path within /template').
 * @param {Object} options The options that the template engine should use.
 * @returns {Promise<string>} A promise with parameter the templated data of the file.
 */
const render = (name: string, options: Object): Promise<string> =>
  new Promise((resolve, reject) => {
    fs.readFileAsync(path.resolve(__dirname, '../template', name), 'utf8')
    .then(data => resolve(handlebars.compile(data)(options)))
    .catch(reject);
  });

export default render;
