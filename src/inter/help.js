// @flow

import utils from '../utils/utils';
import content from '../utils/content';

/**
 * Displays the help text that is written in the content file.
 */
const helpCommand = () => utils.info(content.help());

export default helpCommand;
