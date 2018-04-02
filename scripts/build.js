const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const { promisify } = require('util');
const marked = require('marked');
const frontMatter = require('front-matter');
const globP = promisify(require('glob'));
const config = require('../site.config');

const ejsRenderFile = promisify(ejs.renderFile);
const srcPath = './src';
const distPath = config.build.outputPath;

// clear destination folder
fse.emptyDirSync(distPath);

// copy assets folder
fse.copy(`${srcPath}/assets`, `${distPath}/assets`);

// read pages
globP('**/*.@(md|ejs|html)', { cwd: `${srcPath}/pages` })
  .then(files => {
    files.forEach(file => {
      const fileData = path.parse(file);
      const destPath = path.join(distPath, fileData.dir);

      // create destination directory
      fse
        .mkdirs(destPath)
        .then(() => {
          // read page file
          return fse.readFile(`${srcPath}/pages/${file}`, 'utf-8');
        })
        .then(data => {
          // render page
          const pageData = frontMatter(data);
          const templateConfig = Object.assign({}, config, {
            page: pageData.attributes
          });
          let pageContent;

          // generate page content according to file type
          switch (fileData.ext) {
            case '.md':
              pageContent = marked(pageData.body);
              break;
            case '.ejs':
              pageContent = ejs.render(pageData.body, templateConfig);
              break;
            default:
              pageContent = pageData.body;
          }

          // render layout with page contents
          const layout = pageData.attributes.layout || 'default';

          return ejsRenderFile(
            `${srcPath}/layouts/${layout}.ejs`,
            Object.assign({}, templateConfig, { body: pageContent })
          );
        })
        .then(str => {
          // save the html file
          fse.writeFile(`${destPath}/${fileData.name}.html`, str);
        })
        .catch(err => {
          console.error(err);
        });
    });
  })
  .catch(err => {
    console.error(err);
  });
