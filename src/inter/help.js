// @flow

import utils from '../common/functions';
import content from '../common/content';

/**
 * Displays the help text that is written in the content file.
 */
const helpCommand = () => utils.info(content.help());

export default helpCommand;
