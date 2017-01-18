// @flow

import fs from 'fs';
import path from 'path';

import write from './write';
import render from './render';

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

const readRecursive = (location: string, files: Array<string> = []): Promise<Array<string>> =>
  new Promise((resolve) => {
    const stats = fs.statSync(location);
    if (stats.isFile()) { return resolve([...files, location]); }
    return read(location).then((data) => {
      data.directories.reduce(
        (promise, directory) => promise.then(fls => readRecursive(directory, fls)),
        Promise.resolve([]),
      ).then(result => resolve([...files, ...data.files, ...result]));
    });
  });

const findAllFiles = (location: string): Promise<Array<string>> =>
  new Promise((resolve, reject) => {
    readRecursive(location)
    .then(data => resolve(data.map(l => path.relative(location, l))))
    .catch(reject);
  });

const transfer = (name: string, options: Object, location: string = process.cwd()): Promise<> =>
  new Promise((resolve, reject) => {
    const destination = path.resolve(location, name);
    render(name, options)
    .then(data => write(destination, data))
    .then(resolve)
    .catch(reject);
  });

export default transfer;

console.log(process.cwd());
findAllFiles(path.resolve(process.cwd(), 'template')).then(data => console.log(JSON.stringify(data, null, 4)));
