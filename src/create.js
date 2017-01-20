// @flow

import rfs from 'fs';
import path from 'path';
import chalk from 'chalk';
// import moment from 'moment';
import Promise from 'bluebird';
import inquirer from 'inquirer';

// import createBoilerplate from './boilerplate';

const fs = Promise.promisifyAll(rfs);


// eslint-disable-next-line no-console
const info = console.info;


const askTemplate = templates =>
  fs.readdirAsync(templates).then((files) => {
    const names = files.map(file => path.resolve(templates, file));
    Promise.map(names, name => fs.statAsync(name)).then((results) => {
      const data = results.map((v, i) => ({ k: names[i], v: v.isFile() }));
      const cd = data.filter(e => !e.v).map(e => path.resolve(path.dirname(templates), e.k));
      if (cd.length > 0) {
        inquirer.prompt([{
          type: 'list',
          name: 'template',
          message: 'Choose your boilerplate',
          choices: cd.map(n => path.basename(n)),
        }]).then((answer) => {
          info(`Ok, ${chalk.magenta(answer.template)} it is then!`);
        });
      } else { info(chalk.red('No boilerplates installed! 😭')); }
    });
  });


const create = (output: string, templates: string) => {
  askTemplate(templates);
};

export default create;

/*

// Load the possible templates the user can choose and ask for one
fs.readdirAsync(conf.templates).then((files) => {
  const names = files.map(file => path.resolve(conf.templates, file));
  Promise.map(names, name => fs.statAsync(name)).then((results) => {
    const data = results.map((v, i) => ({ k: names[i], v: v.isFile() }));
    const cd = data.filter(e => !e.v).map(e => path.resolve(path.dirname(conf.templates), e.k));
    if (cd.length > 0) {
      inquirer.prompt([{
        type: 'list',
        name: 'template',
        message: 'Choose your boilerplate',
        choices: cd.map(n => path.basename(n)),
      }]).then((answer) => {
        info(`Ok, ${chalk.magenta(answer.template)} it is then!`);
      });
    } else { info(chalk.red('No boilerplates installed! 😭')); }
  });
});

/*
inquirer.prompt(questions).then((result) => {
  const answers = result;
  result.modules.forEach((module) => { answers[module] = true; });
  winston.debug('Processed answers');
  info('Crafting toolkit...');
  const start = moment.utc();
  createBoilerplate(path.resolve(__dirname, '../template'), answers, destination)
  .then(() => {
    const time = parseFloat(moment.utc().diff(start)) / 1000.00;
    info(`Created app in ${chalk.green(`${time.toFixed(3)}s`)}!`);
    info(chalk.cyan('✨  Done, happy coding! 🎉'));
  }).catch(winston.error);
});
*/
