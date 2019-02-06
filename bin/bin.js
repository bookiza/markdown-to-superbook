#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const fs = require("fs");
const path = require('path');


const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')).toString());

program
  .command('fetch')
  .alias('f')
  .description('Fetch single markdown long-scroll (.md, .markdown or .txt )')
  .option('-f, --file <file_path>', 'Use path to file')
  .option('-u, --url <url>', 'Use url')
  .action(options => {
    const original = require(path.join('..', 'lib', 'fetch.js'));
    original.fetch(options);
  }).on('--help', () => {
    console.log('  Examples:');
    console.log();
    console.log('    $ m2s fetch http(s)://url.html');
    console.log('    $ m2s f http://url.html');
    console.log(chalk.bold('    $ a f https://full_url_here.html    # shortform'));
    console.log();
  });


program
  .command('sanitize')
  .alias('s')
  .description('Sanitize your HTML inline with Bookiza requirements')
  .action(options => {
    const html = require(path.join('..', 'lib', 'sanitize.js'));
    html.sanitize(options)
  }).on('--help', () => {
    console.log('  Examples:')
    console.log()
    console.log('    $ m2s sanitize ')
    console.log('    $ m2s s ')
    console.log(chalk.bold.bgGreen('    $ a s'))
    console.log()
  });


program
  .command('objectify')
  .alias('o')
  .description('Objectify into a Array-like Json')
  .action(() => {
    const page = require(path.join('..', 'lib', 'objectify.js'));
    page.objectify();
  }).on('--help', () => {
    console.log('  Examples:');
    console.log();
    console.log('    $ m2s objectify ');
    console.log('    $ m2s o ');
    console.log(chalk.bold('    $ a o   #shortform'));
    console.log();
  });

program
  .command('pagify')
  .alias('p')
  .description('Pagination with formatting!')
  .action(() => {
    const book = require(path.join('..', 'lib', 'pagify.js'));
    book.pagify()
  }).on('--help', () => {
    console.log('  Examples:');
    console.log('    $ m2s pagify');
    console.log('    $ m2s p ');
    console.log(chalk.bold('$ tmp/.prebook must be ready for this command to work properly.' ));
    console.log();
  });


program
  .command('bookify')
  .alias('b')
  .description('Apply templates to form actual pages')
  .action(() => {
    const page = require(path.join('..', 'lib', 'bookify.js'));
    page.bookify();
  }).on('--help', () => {
    console.log('  Examples:');
    console.log();
    console.log('    $ m2s paginate ');
    console.log('    $ m2s p ');
    console.log(chalk.bold('    $ a p   #shortform'));
    console.log();
  });


// Command catchall
program
  .command('*')
  .on('--help', () => {
    console.log('  Examples:');
    console.log();
    console.log('    $ m2s <fetch> <url>');
    console.log();
  });

// Command version
program
  .version(packageJson.version)
  .option('-v, --version', 'output the version number')
  .parse(process.argv);


if (!program.args.length) {
  program.help();
}