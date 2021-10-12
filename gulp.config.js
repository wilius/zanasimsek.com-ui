'use strict';

module.exports = function () {
    const client = 'client',
        clientApp = './client/app',
        dist = 'dist',
        tmp = '.tmp',
        docs = 'documentation',
        landing = 'landing';

    return {
        client: client,
        dist: dist,
        tmp: tmp,
        index: client + '/index.html',
        alljs: [
            client + '/app/**/*.js',
            './*.js'
        ],
        assets: [
            client + '/app/**/*.html',
            client + '/favicon.ico'
        ],
        assetsLazyLoad: [
            // fonts load async
            // client + '/bower_components/webfontloader/webfontloader.js'
        ],
        less: [],
        sass: [
            client + '/styles/**/*.scss'
        ],
        js: [
            clientApp + '/**/*.module.js',
            clientApp + '/**/*.js',
            '!' + clientApp + '/**/*.spec.js'
        ],
        docs: docs,
        docsJade: [
        ],
        allToClean: [
            tmp,
            '.DS_Store',
            '.sass-cache',
            'node_modules',
            '.git',
            client + '/bower_components',
            docs + '/jade',
            docs + '/layout.html',
            landing + '/jade',
            landing + '/bower_components',
            'readme.md'
        ]
    };
};
