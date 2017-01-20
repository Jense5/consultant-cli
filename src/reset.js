// @flow

import inquirer from 'inquirer';

import content from './content';

// eslint-disable-next-line no-console
const info = console.info;

const reset = (folder: string): Promise<> =>
  new Promise((resolve, reject) => {
    inquirer.prompt([{
      type: 'confirm',
      name: 'sure',
      message: `Sure you want to clear ${folder}?`,
      default: false,
    }]).then((answer) => {
      if (answer.sure) {
        info(content.removeSuccess());
        resolve();
      } else {
        info(content.nevermind());
        resolve();
      }
    });
  });

export default reset;
