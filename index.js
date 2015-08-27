"use strict";

var PLUGIN_NAME = 'gulp-less-json-variables',
    through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    util = require('util');

function formatVariable(key, value){
    return util.format('%s: %s;\n', key.toString(), value);
}

function writeVariable(jsonVariables){
    var str = '';

    Object.keys(jsonVariables).forEach(function(key) {
        str += formatVariable(key, jsonVariables[key]);
    });

    return new Buffer(str);
}

function lessJsonVariableStream(jsonVariables) {
    var stream = through();
    stream.write(writeVariable(jsonVariables));
    return stream;
}

function gulpLessJsonVariables(jsonVariables) {
    if (!jsonVariables) {
        throw new PluginError(PLUGIN_NAME, 'Missing JSON variables!');
    }

    return through.obj(function(file, enc, cb) {
        //if (!jsonVariables) {
        //    cb(new PluginError(PLUGIN_NAME, 'Missing JSON variables!'));
        //}
        if (file.isNull()) {
            return cb(null, file);
        }
        if (file.isBuffer()) {
            file.contents = Buffer.concat([writeVariable(jsonVariables)]);
        }
        if (file.isStream()) {
            file.contents = file.contents.pipe(lessJsonVariableStream(jsonVariables));
        }

        cb(null, file);
    });
}

module.exports = gulpLessJsonVariables;
