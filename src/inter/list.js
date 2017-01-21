// @flow

import list from '../core/list';
import content from '../content';

// eslint-disable-next-line no-console
const info = console.info;

/**
 * Lists all of the names of the boilerplates fetched from the code list action.
 * @param {string} folder The folder location of the templates
 */
const listCommand = (folder: string) =>
  list(folder).then((n) => {
    if (n.length > 0) { info(content.listBPs(n)); }
    if (n.length < 1) { info(content.noBPs()); }
  });

export default listCommand;
