// @flow

import path from 'path';
import fse from 'fs-extra';
import Promise from 'bluebird';

import add from './add';
import utils from '../utils/utils';
import content from '../utils/content';

/**
 * Uses the given batch to add multiple boilerplates at once.
 * @param {string} raw The location of the batchfile
 */
const batchCommand = (raw: string): Promise<> =>
  new Promise((resolve) => {
    if (raw) {
      const location = path.resolve(process.cwd(), raw);
      utils.info(content.startBatch(location));
      if (fse.existsSync(location) && fse.statSync(location).isFile()) {
        try {
          const pack = JSON.parse(fse.readFileSync(location, 'utf8'));
          Promise.reduce(pack.data, (a, e) => add(e.url, e.name), [])
          .then(() => utils.info(content.done()))
          .then(resolve)
          .catch(() => utils.info(content.invalidBatch()));
        } catch (exc) { utils.info(content.invalidBatch()); }
      } else { utils.info(content.invalidBatch()); }
    } else { utils.info(content.invalidBatch()); }
  });

export default batchCommand;
