// @flow

/**
 * File containing the functions used when the ADD action is executed. Whenever the ADD action is
 * about to execute, it should call the following checks in their given order.
 *    1. Check if it is online or offline boilerplate
 *    2. Get the name or use the optional name
 *    3. Check if there are any naming conflicts
 *    4. Clone / Move the files to the desired location
 *    5. Check if the newly created boilerplate is valid
 *    (6. Possible rollback if anything goes wrong or invalid boilerplate)
 * @author  Jensen Bernard
 * @version 0.2.0
 */

import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import validURL from 'valid-url';
import { exec } from 'child_process';

import content from './content';

// eslint-disable-next-line no-console
const info = console.info;

const execute = Promise.promisify(exec);

const name = (uri: string): string => path.basename(uri, '.git');
const folder = (uri: string, base: string): string => path.resolve(base, name(uri));
const canCreate = (uri: string, base: string): boolean => fs.existsSync(folder(uri, base));

const cmd = (uri: string, out: string): string => `git clone ${uri} ${out}`;
const clone = (uri: string, tmpl: string): Promise<> => execute(cmd(uri, folder(uri, tmpl)));

const add = (uri: string, templates: string): Promise<> =>
  new Promise((resolve, reject) => {
    if (validURL.isWebUri(uri)) {
      if (canCreate(uri, templates)) {
        clone(uri, templates).then(resolve).catch(reject);
      } else { info(content.duplicateName()); }
    } else {
      info(content.invalidURI());
      process.exit();
    }
  });

export default add;
