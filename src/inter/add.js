// @flow

import _ from 'lodash';
import path from 'path';
import inquirer from 'inquirer';
import validUrl from 'valid-url';
import Promise from 'bluebird';

import list from '../core/list';
import content from '../content';
import { clone } from '../core/add';

// eslint-disable-next-line no-console
const info = console.info;

const nameInquirer = (names: Array<string>): Array<Object> => ([{
  type: 'input',
  name: 'name',
  message: 'How would you like to call the new boilerplate?',
  validate: input => (_.includes(names, input) ? `Boilerplate '${input}' exists! 😕` : true),
}]);

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
        // TODO
      }
    });
  } else {
    info(content.noUrl());
  }
};

export default add;
