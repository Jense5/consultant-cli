// @flow

import path from 'path';
import rfse from 'fs-extra';
import Promise from 'bluebird';
import { exec } from 'child_process';

import config from '../common/config';

const fse = Promise.promisifyAll(rfse);
const execute = Promise.promisify(exec);

/**
 * Copies the folder at the given location to the given destination location. This function is used
 * to install local templates.
 * @param {string} folder The location of the template
 * @param {string} name The name of the template
 * @returns {Promise<>} Which finishes when the copying is done
 */
const local = (folder: string, name: string): Promise<> =>
  fse.copyAsync(folder, path.resolve(config.templateDirectory, name));

/**
 * Generates the command to be executed in order to download an online repository.
 * @param {string} uri The url of the git repository
 * @param {string} name The name of the template
 * @returns {string} The command to be executed
 */
const cmd = (uri: string, name: string): string =>
  `git clone ${uri} ${path.resolve(config.templateDirectory, name)}`;

/**
 * Clones the git repository at the given uri to the given local location.
 * @param {string} uri The url of the git repository
 * @param {string} name The name of the template
 * @returns {Promise<>} Which finished when the cloning is done
 */
const online = (uri: string, name: string): Promise<> => execute(cmd(uri, name));

exports.local = local;
exports.online = online;
