// @flow

import rfs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import Promise from 'bluebird';
import handlebars from 'handlebars';

const fs = Promise.promisifyAll(rfs);
const mkdir = Promise.promisify(mkdirp);

/**
 * Reads all files in the given directory and subdirectories. Returns a promise with an
 * Array<string> that contains all the absolute paths of the found files. The promise will reject
 * when something went wrong while reading the directory or one of the subdirectories. If the
 * given path is a file and not a directory, it will also reject. An optional list of strings
 * can be provided as a second argument which will be merged with the list of results. This makes
 * it possible to call this function recursively.
 * @param {string} location The location of the directory to check
 * @param {?Array<string>} previous The previous paths to merge with the results list
 * @returns {Promise<Array<string>>} A promise with the read data
 */
const discover = (location: string, previous: Array<string> = []): Promise<Array<string>> =>
  new Promise((resolve, reject) => {
    fs.readdirAsync(location).then((files) => {
      const names = files.map(file => path.resolve(location, file));
      Promise.map(names, name => fs.statAsync(name)).then((results) => {
        const data = results.map((v, i) => ({ k: names[i], v: v.isFile() }));
        const cf = data.filter(e => e.v).map(e => path.resolve(path.dirname(location), e.k));
        const cd = data.filter(e => !e.v).map(e => path.resolve(path.dirname(location), e.k));
        Promise.reduce(cd, (f, d) => discover(d, f).then(acc => acc), [])
        .then(sf => resolve([...previous, ...cf, ...sf]));
      });
    }).catch(reject);
  });

/**
 * Renders the file at the given location with handlebars, while using the given options. After
 * the file is processed, it will be written to a file at the output location. The function returns
 * a promise when the render function is finished.
 * @param {string} file The location of the template file
 * @param {Object} opts The options for the handlebars renderer
 * @param {string} output The location of the output file
 * @returns {Promise<>} A promise to know when the renderer is ready
 */
const render = (file: string, opts: Object, output: string): Promise<> =>
  new Promise((resolve, reject) => {
    mkdir(path.dirname(output))
    .then(() => fs.readFileAsync(file, 'utf8'))
    .then(data => handlebars.compile(data)(opts))
    .then(data => resolve(fs.writeFileAsync(output, data)))
    .catch(reject);
  });

/**
 * Creates a boilerplate from the given template at the templ location at the dest location. If no
 * destination location is given, it uses process.cwd(). The opts parameter should be an object
 * which holds the parameters for the rendere function.
 * @param {string} file The location of the template directory
 * @param {Object} opts The options for the handlebars renderer
 * @param {?string} output The directory of the output template
 * @returns {Promise<>} A promise to know when the renderer is ready
 */
const createBoilerplate = (templ: string, opts: Object, dest: string = process.cwd()): Promise<> =>
  new Promise((resolve, reject) => {
    discover(templ).then((files) => {
      Promise.map(files, (file) => {
        render(file, opts, path.resolve(dest, path.relative(templ, file)));
      }).then(resolve);
    }).catch(reject);
  });

export default createBoilerplate;
