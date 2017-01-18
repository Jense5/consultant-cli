// @flow

import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

const write = (location: string, data: string): Promise<> =>
  new Promise((resolve, reject) => {
    const dir = path.dirname(location);
    mkdirp(dir, (issue) => {
      if (issue) { return reject(issue); }
      return fs.writeFile(location, data, (error) => {
        if (error) { return reject(error); }
        return resolve();
      });
    });
  });

export default write;
