var Asserter = require('./lib/asserter'),
    commands = require('./lib/commands')

module.exports = function (wd) {

    wd = wd || require('webdriverjs')
    var proto = wd.prototype || wd.__proto__
    if (typeof proto.$ === 'function' && typeof proto.expect === 'function') return

    // initiate a new selector scope
    proto.$ = proto.expect = function (selector) {
        this.__wc_selector = selector
        return this
    }

    // allow chaining within current selector scope
    var chain = {
        get: function () {
            return new Asserter(this, this.__wc_selector)
        }
    }
    Object.defineProperty(proto, 'should', chain)
    Object.defineProperty(proto, 'to', chain)

    commands.addTo(proto)

}

module.exports.Asserter = Asserter