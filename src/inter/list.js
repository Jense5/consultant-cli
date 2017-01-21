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
  list(folder).then(n => info(content.listBPs(n)));

export default listCommand;
