
module.exports = (consultant) => {

  /**
   * Set the type of a consultant template. This can be a TEMPLATE or a COLLECTION. A COLLECTION
   * makes it possible to install multiple templates at once. Also define the relative path from
   * the root of the project where the template (or multiple) are stored. The default source
   * location is `cst` and the default type is TEMPLATE. So in the next snippet, we don't have to
   * define them (but it is allowed for better overview).
   */
  consultant.source = 'cst';
  consultant.type = consultant.types.TEMPLATE;

  /**
   * Define custom delimiters based on your projects. By default, constultant uses `{{` and `}}`,
   * but in some projects (like Angular), this might be harmful. That's why it is possible to
   * overwrite them based on the current project. In this example `<== X ==>` will be replaced
   * by variable X when the template is created.
   */
  consultant.delimiters = { start: '<==', end: '==>' };

  /**
   * By default, all files are used to generate a template. However, it is possible that you do not
   * want to include some files, based on the option the user has given. The `filter` function makes
   * it possible to pass validators to consultant which make it possible to decide whether or not
   * to include them based on the provided options.
   */
  consultant.filter('cst/src', options => options.dotenv);
  consultant.filter('cst/.env.example', options => options.dotenv);

};
