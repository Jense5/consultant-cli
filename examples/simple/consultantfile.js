
export default (consultant) => {

  /**
   * Set the type of a consultant template. This can be a TEMPLATE or a COLLECTION. A COLLECTION
   * makes it possible to install multiple templates at once. Also define the relative path from
   * the root of the project where the template (or multiple) are stored. The default source
   * location is `cst` and the default type is TEMPLATE. So in the next snippet, we don't have to
   * define them (but it is allowed for better overview).
   */
  consultant.source = 'cst';
  // REMOVE TEMPLATE?
  // WE CAN BATCH IT?

  /**
   * Define custom delimiters based on your projects. By default, constultant uses `{{` and `}}`,
   * but in some projects (like Angular), this might be harmful. That's why it is possible to
   * overwrite them based on the current project. In this example `<== X ==>` will be replaced
   * by variable X when the template is created.
   */
  consultant.delimiters = { start: '<<<<', end: '>>>>' };

  /**
   * By default, all files are used to generate a template. However, it is possible that you do not
   * want to include some files, based on the option the user has given. The `filter` function makes
   * it possible to pass validators to consultant which make it possible to decide whether or not
   * to include them based on the provided options. The path of these files or folders should be
   * relative to the root of the template folder (see example).
   */
  consultant.filter('optionB.js', options => options.B);

  /**
   * In the end, you can add the list of questions that should be asked before generation the
   * template. Here is an example with some basic questions. The `input` type asks for a string of
   * the user, which need to pass the corresponding parameter. The checkbox type gives a list with
   * options which the user can select. For a full overview of which questions you can ask, please
   * take a look at https://jense5.github.io/consultant/questions.md, it will only take 5 minutes.
   * The questions will be asked in the same order you write them.
   */
  consultant.questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Your name:',
      default: 'Jensen',
      validate: input => input.length > 3 ? true : 'You need at least 4 characters!',
    },
    {
      type: 'checkbox',
      name: 'modules',
      message: 'Choose some options:',
      choices: [ { name: 'optionA', value: 'A' }, { name: 'optionB', value: 'B' } ],
    },
  ];

  consultant.introduction = input => `
    Hey, you are building a sample template!
  `;

};
