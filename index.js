var Asserter = require('./lib/asserter')

module.exports = function (wd) {

    wd = wd || require('webdriverjs')

    // initiate a new selector scope
    wd.prototype.$ = wd.prototype.expect = function (selector) {
        this.__wc_selector = selector
        return new Asserter(this, selector)
    }

    // allow chaining within current selector scope
    var chain = {
        get: function () {
            return new Asserter(this, this.__wc_selector)
        }
    }
    Object.defineProperty(wd.prototype, 'should', chain)
    Object.defineProperty(wd.prototype, 'to', chain)

}

module.exports.Asserter = Asserter