// @flow

import path from 'path';
import config from './config';
import type { Delimiters, Filter } from './types';

class Consultant {

  root: string;
  source: string;
  filters: Map<string, Filter>;
  delimiters: Delimiters;
  questions: Array<Object>;
  introduction: (input: Object) => string;

  constructor(root: string): void {
    this.root = root;
    this.source = config.defaultTemplateSource;
    this.delimiters = config.defaultDelimiters;
    this.filters = new Map();
    this.questions = [];
    this.introduction = config.defaultIntroduction;
  }

  filter(file: string, filter: Filter): void { this.filters.set(file, filter); }

  path(): string { return path.resolve(this.root, this.source); }

}

module.exports = Consultant;
