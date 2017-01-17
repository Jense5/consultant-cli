// @flow

import fs from 'fs';

const write = (path: string, data: string): Promise<> =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) { return reject(error); }
      return resolve();
    });
  });

export default write;
