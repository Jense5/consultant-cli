// @flow

import utils from '../utils/functions';
import content from '../utils/content';

/**
 * Displays the help text that is written in the content file.
 */
const helpCommand = () => utils.info(content.help());

export default helpCommand;
