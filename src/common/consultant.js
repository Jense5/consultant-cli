// @flow

import config from './config';
import type { Delimiters, Filter } from './types';

class Consultant {

  source: string;
  filters: Map<string, Filter>;
  delimiters: Delimiters;
  questions: Array<Object>;
  tutorial: string;

  constructor(): void {
    this.source = config.defaultTemplateSource;
    this.delimiters = config.defaultDelimiters;
    this.filters = new Map();
    this.questions = [];
    this.tutorial = config.defaultTutorial;
  }

  filter(file: string, filter: Filter): void { this.filters.set(file, filter); }

}

exports.default = Consultant;
