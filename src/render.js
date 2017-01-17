// @flow

import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

const render = (name: string, options: Object): Promise<string> =>
  new Promise((resolve, reject) => {
    const location = path.resolve(__dirname, '../template', name);
    fs.readFile(location, 'utf8', (error, data) => {
      if (error) { return reject(error); }
      const template = handlebars.compile(data);
      return resolve(template(options));
    });
  });

export default render;
