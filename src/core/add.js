// @flow

import rfse from 'fs-extra';
import Promise from 'bluebird';
import { exec } from 'child_process';

const fse = Promise.promisifyAll(rfse);
const execute = Promise.promisify(exec);

/**
 * Copies the folder at the given location to the given destination location. This function is used
 * to install local boilerplates.
 * @param {string} folder The location of the boilerplate
 * @param {string} dest The destination location of the boilerplate
 * @returns {Promise<>} Which finishes when the copying is done
 */
const copy = (folder: string, dest: string): Promise<> => fse.copyAsync(folder, dest);

/**
 * Generates the command to be executed in order to download an online repository.
 * @param {string} uri The url of the git repository
 * @param {string} out The destination location of the boilerplate
 * @returns {string} The command to be executed
 */
const cmd = (uri: string, out: string): string => `git clone ${uri} ${out}`;

/**
 * Clones the git repository at the given uri to the given local location.
 * @param {string} uri The url of the git repository
 * @param {string} out The destination location of the boilerplate
 * @returns {Promise<>} Which finished when the cloning is done
 */
const clone = (uri: string, dest: string): Promise<> => execute(cmd(uri, dest));

exports.copy = copy;
exports.clone = clone;
