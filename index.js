var wd             = require('wd'),
    chai           = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    methods        = require('./lib/methods')

// setup
require("mocha-as-promised")()
chai.use(chaiAsPromised)
chai.should()
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

for (var m in methods) {
    wd.addPromiseChainMethod(m, methods[m])
}

module.exports = wd