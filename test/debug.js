const klaw = require('klaw');

const items = []; // files, directories, symlinks, etc
klaw('../cb-command-line/template')
  .on('data', (item) => {
    items.push(item.path);
  })
  .on('end', () => {
    console.dir(items); // => [ ... array of files]
  });
