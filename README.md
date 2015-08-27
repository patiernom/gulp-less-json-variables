# gulp-less-json-variables

[![GitHub version][gulp-less-json-variables-fury-image]][gulp-less-json-variables-fury-url]
[![Dependency Status][gulp-less-json-variables-dependencies-image]][gulp-less-json-variables-dependencies-url]
[![devDependency Status][gulp-less-json-variables-devdependencies-image]][gulp-less-json-variables-devdependencies-url]
[![Build Status][gulp-less-json-variables-travis-image]][gulp-less-json-variables-travis-url]
[![Coverage Status][gulp-less-json-variables-coverage-image]][gulp-less-json-variables-coverage-url]

# Gulp write less variables from JSON

A simple plugin for [Gulp](http://gulpjs.com/). This module write on source file, specified less variables from JSON config file.

## Installation

The easiest way is to keep `gulp-less-json-variables` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "gulp": "^3.9.0",
    "gulp-less-json-variables": "1.0.0"
  }
}
```

You can simple do it by:
```bash
npm install gulp-less-json-variables --save-dev
```


## API

### plugin(json)

Write on input file with the given variables from `json` and
returns a transform stream for use in your gulp pipeline.



## Usage
Create a JSON config file like this:
```json
{
  "@gray-base": "#000",
  "@gray-darker": "lighten(@gray-base, 13.5%)",
  "@gray-dark": "lighten(@gray-base, 20%)",
  "@gray": "lighten(@gray-base, 33.5%)",
}
```
this file contains the coupled key value representing less variables.


```javascript
var gulp = require('gulp'), 
    lessVars = require('gulp-less-json-variables'),
    jsonVars = require('variables.json');

gulp.task('generate less variables', function() {
  return gulp.src('less/variables.js')
    .pipe(lessVars(jsonVars))
    .pipe(gulp.dest('dist'));
});
```


## Contributing

In line of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [gulp](http://gulpjs.com/).


## Release History

27/08/2015 - v1.0.4 - Fix variable row generation with the character ":" instead of "=".


## License

Licensed under the MIT license.


[gulp-less-json-variables-fury-image]: https://badge.fury.io/gh/patiernom%2Fgulp-less-json-variables.svg
[gulp-less-json-variables-fury-url]: http://badge.fury.io/gh/patiernom%2Fgulp-less-json-variables
[gulp-less-json-variables-dependencies-image]: https://david-dm.org/patiernom/gulp-less-json-variables.svg
[gulp-less-json-variables-dependencies-url]: https://david-dm.org/patiernom/gulp-less-json-variables
[gulp-less-json-variables-devdependencies-image]: https://david-dm.org/patiernom/gulp-less-json-variables/dev-status.svg
[gulp-less-json-variables-devdependencies-url]: https://david-dm.org/patiernom/gulp-less-json-variables#info=devDependencies
[gulp-less-json-variables-peerdependencies-image]: https://david-dm.org/patiernom/gulp-less-json-variables/peer-status.svg
[gulp-less-json-variables-peerdependencies-url]: https://david-dm.org/patiernom/gulp-less-json-variables#info=peerDependencies
[gulp-less-json-variables-travis-image]: https://travis-ci.org/patiernom/gulp-less-json-variables.svg?branch=master
[gulp-less-json-variables-travis-url]: https://travis-ci.org/patiernom/gulp-less-json-variables
[gulp-less-json-variables-coverage-image]: https://coveralls.io/repos/patiernom/gulp-less-json-variables/badge.svg?branch=master&service=github
[gulp-less-json-variables-coverage-url]: https://coveralls.io/github/patiernom/gulp-less-json-variables?branch=master
