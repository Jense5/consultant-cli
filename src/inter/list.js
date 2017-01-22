// @flow

import list from '../core/list';
import utils from '../common/functions';
import content from '../common/content';

/**
 * Lists all of the names of the templates fetched from the core list action. A specific
 * message will be shown if there are no templates.
 */
const listCommand = () => list().then(n => utils.info(content.listBPs(n)));

export default listCommand;
