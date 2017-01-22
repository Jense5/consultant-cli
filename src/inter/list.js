// @flow

import list from '../core/list';
import content from '../common/content';

// eslint-disable-next-line no-console
const info = console.info;

/**
 * Lists all of the names of the templates fetched from the core list action. A specific
 * message will be shown if there are no templates.
 */
const listCommand = () => list().then(n => info(content.listBPs(n)));

export default listCommand;
