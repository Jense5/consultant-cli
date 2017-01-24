
export default (template) => {

  template.setSourceFolder('template');

  template.setStart('<<');
  template.setEnd('>>');

  template.filter('optional.md', options => options.optionalFileRequired);

  template.ask([
    {
      type: 'input',
      name: 'name',
      message: 'Your name:',
      default: 'Jensen',
      validate: input => input.length > 3: true: 'You need at least 4 characters!',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Describe yourself:',
    },
    {
      type: 'confirm',
      name: 'optionalFileRequired',
      message: 'Would you like the optional file?',
      default: false,
    },
    {
      type: 'checkbox',
      name: 'options',
      message: 'Choose some options:',
      choices: [
        { name: 'optionA', value: 'A' },
        { name: 'optionB', value: 'B' },
        { name: 'optionC', value: 'C' },
        { name: 'optionD', value: 'D' },
      ],
    }
  ]);

  template.setIntroduction('You are going to create the example markdown template!');
  template.setSummary(input => `
    Created the markdown template!
    Name = ${input.name}
    Description = ${input.description}
    OptionalFile = ${input.optionalFile}
    Selected = \n ${input.options.map(o => `     option: ${o}\n`)}
  `);

};
