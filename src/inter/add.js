// @flow

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import validUrl from 'valid-url';
import Promise from 'bluebird';

import list from '../core/list';
import content from '../common/content';
import { clone, copy } from '../core/add';

// eslint-disable-next-line no-console
const info = console.info;

/**
 * Generates the question that should be asked to make sure the user wants to add the correct
 * boilerplate. The answer he gives should also not exist.
 * @param {Array<string>} names The boilerplates which the user can not choose
 * @return {Array<Object>} The questions to be passed to the inquirer module
 */
const nameInquirer = (names: Array<string>): Array<Object> => ([{
  type: 'input',
  name: 'name',
  message: 'How would you like to call the new boilerplate?',
  validate: input => (_.includes(names, input) ? `Boilerplate '${input}' exists! 😕` : true),
}]);

/**
 * Function to make sure that the given boilerplate name doest not exits.
 * @param {string} folder The folder which should contain the boilerplates
 * @param {string} template The name that is provided by the user
 * @returns {Promise<>} Only succeeds when the given template folder does not contain boilerplate
 */
const makeSureValidName = (folder: string, template: string): Promise<> =>
  new Promise((resolve) => {
    list(folder)
    .then((names) => {
      if (!template || _.includes(names, template)) {
        info(content.listBPs(names));
        inquirer.prompt(nameInquirer(names))
        .then(answer => resolve(answer.name));
      } else { resolve(template); }
    });
  });

/**
 * Adds the given uri to the given templates folder, with the given name. This can be an online
 * repo or an offline folder.
 * @param {string} folder The folder to store the templates
 * @param {string} uri The location (online or offline) of the template
 * @param {string} name The name of the template.
 */
const add = (folder: string, uri: string, raw: string) => {
  if (uri) {
    makeSureValidName(folder, raw)
    .then((name) => {
      if (validUrl.isWebUri(uri)) {
        info(content.startClone());
        clone(uri, path.resolve(folder, name))
        .then(() => info(content.installedBP(name)))
        .catch(() => info(content.unableToClone()));
      } else {
        info(content.startCopy());
        if (fs.existsSync(path.resolve(process.cwd(), uri))) {
          copy(path.resolve(process.cwd(), uri), path.resolve(folder, name))
          .then(() => info(content.installedBP(name)))
          .catch(() => info(content.unableToCopy()));
        } else { info(content.unableToCopy()); }
      }
    });
  } else {
    info(content.noUrl());
  }
};

export default add;
