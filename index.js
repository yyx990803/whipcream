var Asserter = require('./lib/asserter')

exports.Asserter = Asserter

exports.addTo = function (wd) {

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