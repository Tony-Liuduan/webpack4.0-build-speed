//import {app} from './containers/index.js';
//const app = require('./containers/index.js');
//console.log(app);
require.ensure(['./containers/index.js'], function () {
    console.log('preload')
    //var app = require.include('./containers/index.js');
    var app = require('./containers/index.js');
    console.log(app);
}, 'test');
