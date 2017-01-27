// @flow

import path from 'path';
import chalk from 'chalk';
import fse from 'fs-extra';
import winston from 'winston';
import untildify from 'untildify';

const CONF = untildify('~/.consultant');

/**
 * Checks whether or not the configuration file of consultant exists.
 * @returns {boolean} True if and only if the configuration file exists.
 */
const doesConfExist = () => fse.existsSync(CONF);

/**
 * Copies the default environment file to the specified location of
 * the config file of consultant. This should only be done to reset or to
 * create a new configuration file.
 */
const createConf = () => fse.copySync(path.resolve(__dirname, './default.env'), CONF);

/**
 * Creates a default configuration file if none exists. When one exists,
 * we will load it and process the variables if needed (ie with untildify).
 * This function should be called in the beginning of index.
 */
export default () => {
  if (!doesConfExist()) { createConf(); }
  require('dotenv').config({ path: CONF });
  process.env.templates = untildify(process.env.templates);
  fse.ensureDirSync(process.env.templates || '.');
  winston.debug(`Setup ${chalk.green('success')}!`);
  winston.debug(`Using ${chalk.blue(process.env.templates)} as templates folder.`);
  winston.debug(`Default template configuration file is ${chalk.blue(process.env.configurationFile)}.`);
  winston.debug(`Default template source folder is ${chalk.blue(process.env.defaultTemplateSource)}.`);
  winston.debug(`Default delimiters are ${chalk.blue(process.env.defaultStart)} and ${chalk.blue(process.env.defaultEnd)}.`);
};
