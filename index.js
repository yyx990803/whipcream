var Asserter = require('./lib/asserter')

exports.Asserter = Asserter

exports.addTo = function (wd) {
    wd.prototype.$ = function (selector) {
        return new Asserter(this, selector)
    }
}