'use strict';

var chai = require('chai'),
    expect = chai.expect,
    File = require('vinyl'),
    es = require('event-stream'),
    PluginError = require('gulp-util').PluginError;

describe('Gulp plugin gulp-less-json-variables', function () {
    var Plugin;

    before(function (done) {
        Plugin = require('../index');
        done();
    });

    describe('module exports gulp plugin', function () {
        it('exists', function (done) {
            expect(Plugin).to.exist;
            done();
        });

        it('is function', function (done) {
            expect(typeof Plugin).to.equal('function');
            done();
        });
    });

    describe('gulp plugin', function () {
        var fakeFile, stream;

        afterEach(function(done){
            stream = undefined;

            done();
        });

        describe('mange exceptions', function () {
            before(function (done) {
                fakeFile = new File();

                done();
            });

            after(function(done){
                fakeFile = undefined;

                done();
            });

            it('not modify empty files', function (done) {
                stream = Plugin({});
                stream.write(fakeFile);

                stream.on('data', function (data) {
                    expect(data.contents).to.be.a('null');
                    done();
                });
            });

            it('throw an error when JSON is undefined or null', function (done) {
                try {
                    stream = Plugin();
                    stream.write(fakeFile);
                } catch (err) {
                    expect(err).to.be.an.instanceof(PluginError);
                    done();
                }
            });
        });

        describe('write data of JSON', function () {
            var jsonVariables = {
                    "@gray-base": "#000",
                    "@gray-darker": "lighten(@gray-base, 13.5%)",
                    "@link-hover-decoration": "underline",
                    "@font-family-sans-serif": "\"Helvetica Neue\", Helvetica, Arial, sans-serif"
                },
                stringVariables =
                    '@gray-base = #000;\n' +
                    '@gray-darker = lighten(@gray-base, 13.5%);\n' +
                    '@link-hover-decoration = underline;\n' +
                    '@font-family-sans-serif = \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n'
                ,
                arrayVariables = [
                    '@gray-base = #000;\n',
                    '@gray-darker = lighten(@gray-base, 13.5%);\n',
                    '@link-hover-decoration = underline;\n',
                    '@font-family-sans-serif = \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n'
                ],
                expectFile;


            describe('in buffer mode', function () {
                before(function (done) {
                    stream = Plugin(jsonVariables);
                    fakeFile = new File({
                        cwd: "/",
                        base: "/tests/",
                        path: "/tests/variables.buffer.less",
                        contents: new Buffer('')
                    });

                    expectFile = new File({
                        cwd: "/",
                        base: "/tests/",
                        path: "/tests/variables.expected.buffer.less",
                        contents: new Buffer(arrayVariables.join(''))
                    });

                    done();
                });

                after(function(done){
                    fakeFile = undefined;
                    expectFile  = undefined;

                    done();
                });

                it('create less variables', function (done) {
                    stream.write(fakeFile);

                    stream.on('data', function (file) {
                        expect(file.isBuffer()).to.be.equal(true);
                        expect(file.contents.toString('utf8')).to.be.equal(expectFile.contents.toString('utf8'));
                        done();
                    });
                });
            });

            describe('in stream mode', function () {
                var streamExpectFile;

                before(function (done) {
                    stream = Plugin(jsonVariables);
                    fakeFile = new File({
                        cwd: "/",
                        base: "/tests/",
                        path: "/tests/variables.expected.stream.less",
                        contents: es.readArray([''])
                    });

                    expectFile = new File({
                        cwd: "/",
                        base: "/tests/",
                        path: "/tests/variables.stream.less",
                        contents: es.readArray(arrayVariables)
                    });

                    expectFile.contents.pipe(es.wait(function(err, data) {
                        streamExpectFile = data.toString('utf8');
                        done();
                    }));
                });

                after(function(done){
                    fakeFile = undefined;
                    expectFile  = undefined;

                    done();
                });

                it('create less variable', function (done) {
                    stream.write(fakeFile);

                    stream.on('data', function (file) {
                        expect(file.isStream()).to.be.equal(true);
                        file.contents.on('data', function (data) {
                            expect(data.toString('utf8')).to.be.equal(streamExpectFile);
                            done();
                        });
                    });
                });
            });

        });
    });
});