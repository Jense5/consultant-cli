// @flow

import fs from 'fs';
import path from 'path';
import winston from 'winston';

import write from './write';
import render from './render';

/**
 * Reads the given location and returns a promise with an Object with two keys: files and
 * directories. Files will be an Array<string> with the absolute paths of the files in the given
 * folder or an Array<string> with the given location if the given location is a file. If the
 * given location is a directory, the directories key will contain an Array<string> with all
 * absolute paths of the subdirectories of the given directory.
 * @param {string} location The location to check.
 * @returns {Promise<Object>} A promise with the read data.
 */
const read = (location: string): Promise<Object> =>
  new Promise((resolve, reject) => {
    fs.stat(location, (derr, stat) => {
      if (derr) { return reject(`Unable to read ${location}`); }
      if (!stat.isDirectory()) { return resolve({ files: [location], directories: [] }); }
      return fs.readdir(location, (rerr, files) => {
        if (rerr) { return reject(`Unable to read childs of ${location}`); }
        const response = { files: [], directories: [] };
        const paths = files.map(file => path.resolve(location, file));
        paths.forEach((file) => {
          const stats = fs.statSync(file);
          if (stats.isFile()) { response.files.push(file); }
          if (stats.isDirectory()) { response.directories.push(file); }
        });
        return resolve(response);
      });
    });
  });

/**
 * Returns a promise with an Array<string> which contains all the absolute paths within the given
 * directory and nested subdirectories if the given location is a directory. If the given location
 * is a file, the list will just contain the given path.
 * @param {string} location The location of the file to check.
 * @param {Array<string>} files The files that should be added to the returned list.
 * @returns {Promise<Array<string>>} The promise with the list of all the files' paths.
 */
const readRecursive = (location: string, files: Array<string> = []): Promise<Array<string>> =>
  new Promise((resolve, reject) => {
    winston.debug(`Read recursive: ${location}`);
    const stats = fs.statSync(location);
    if (stats.isFile()) { return resolve([...files, location]); }
    return read(location).then((data) => {
      winston.debug(`Found these files: ${JSON.stringify(data, null, 4)}`);
      data.directories.reduce(
        (promise, directory) => promise.then(fls => readRecursive(directory, fls)),
        Promise.resolve([]),
      ).then(result => resolve([...files, ...data.files, ...result])).catch(reject);
    });
  });

/**
 * Returns a promise with an Array<string> which are all the relative paths of the files to render
 * within the given location folder. It kind of does the same as readRecursive, however it formats
 * the locations to their relative locations.
 * @param {string} location The location of the directory to check recursively.
 */
const findAllFiles = (location: string): Promise<Array<string>> =>
  new Promise((resolve, reject) => {
    readRecursive(location)
    .then(data => resolve(data.map(l => path.relative(location, l))))
    .catch(reject);
  });

/**
 * Transfers a file with given name (which is the relative path within the template folder) to the
 * same relative location within the given (optional) location directory. The options will be
 * parsed and the files will be formatted with the handlebars render engine.
 * @param {string} name The name of the file to clone.
 * @param {Object} options The options for the rendering engine.
 * @param {string} location The location of the destination folder.
 * @returns {Promise<>} A promise to know when the cloner is ready.
 */
const transfer = (name: string, options: Object, location: string = process.cwd()): Promise<> =>
  new Promise((resolve, reject) => {
    const destination = path.resolve(location, name);
    winston.debug(`Cloning ${name} to ${destination}`);
    render(name, options)
    .then(data => write(destination, data))
    .then(resolve)
    .catch(reject);
  });

/**
 * Transfers the complete template in the /template directory into the given location. If the
 * location does not exists, it will be created. The given options will be used to pass through
 * to the rendering engine.
 * @param {Object} options The options for the rendereing engine.
 * @param {string} location The location to clone the files to.
 * @returns {Promise<>} A promise to know when the process is finished.
 */
const transferTemplate = (options: Object, location: string = process.cwd()): Promise<> =>
  new Promise((resolve, reject) => {
    findAllFiles(path.resolve(__dirname, '../template')).then((files) => {
      winston.debug(`All files to clone: ${JSON.stringify(files, null, 4)}`);
      files.reduce(
        (promise, file) => promise.then(() => transfer(file, options, location)),
        Promise.resolve(),
      ).then(resolve).catch(reject);
    }).catch(reject);
  });

export default transferTemplate;
