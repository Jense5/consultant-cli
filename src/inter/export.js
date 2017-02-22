// @flow

import path from 'path';
import rfse from 'fs-extra';
import Promise from 'bluebird';
import utils from '../utils/utils';
import content from '../utils/content';
import exportFunction from '../core/export';

const fse = Promise.promisifyAll(rfse);

/**
 * Exports a batch structure to create a batch file for backup.
 * @returns {Promise<>} A promise which will notify when the export is finshed.
 */
const exportCommand = (location: ?string): Promise<> =>
  exportFunction().then((data) => {
    const output = JSON.stringify(data, null, 4);
    if (location) {
      const absolute = path.resolve(process.cwd(), location);
      fse.writeFileAsync(absolute, output);
    } else { utils.info(output); }
    utils.info(content.done());
  });

export default exportCommand;
