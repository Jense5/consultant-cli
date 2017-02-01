// @flow

import update from '../core/update';

/**
 * Updates the boilerplate with the given name. If no name is given, all boilerplates will be
 * updated (if they have a .git folder).
 * @param {string} name The name of the boilerplate to update
 * @returns {Promise<>} A promise that notifies when all boilerplates are updates
 */
const updateCommand = (): Promise<> => update();

export default updateCommand;
