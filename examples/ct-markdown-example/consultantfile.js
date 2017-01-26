
export default (template) => {

  // Set the default template folder, which is /template.
  template.setSourceFolder('template');

  // Set the start and end delimiters for this template.
  // We use << varname >> as template syntax.
  template.setStart('<<');
  template.setEnd('>>');

  // Filter out the optional.md file, based on the provided options.
  // If the optionalFileRequired option is not set, do not add the
  // file to the generated template. Note that optionalFileRequired is
  // defined within the ask method below.
  template.filter('optional.md', options => options.optionalFileRequired);

  // Ask some questions to the user when the template is about to render.
  // This is used to define some parameters to customize the template.
  // The questions are following the default inquirer syntax.
  // Check the readme of this repo for more info.
  template.ask([
    {
      type: 'input',
      name: 'name',
      message: 'Your name?',
      validate: input =>
        input.length > 3: true: 'You need at least 4 characters!',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description?',
      validate: input =>
        input.length > 5: true: 'You need at least 6 characters!',
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

  // Last but not least, write an introduction and a summary. The introduction
  // should just be a string which can be printed at the beginning of the render
  // process (right before questions are asked). The summary is a callback, which
  // will pass the input variables from the questions so you can use them in the print.
  template.setIntroduction('You are going to create the example markdown template!');
  template.setSummary(input => `
    Created the markdown template!
    Name = ${input.name}
    Description = ${input.description}
    OptionalFile = ${input.optionalFile}
    Selected = \n ${input.options.map(o => `     option: ${o}\n`)}
  `);

};
