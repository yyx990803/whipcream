var assert = require('assert')

function Asserter (browser, selector) {
    this.browser = browser
    this.selector = selector
    this.negate = false
}

// negation
Object.defineProperty(Asserter.prototype, 'not', {
    get: function () {
        this.negate = true
        return this
    }
})

// enable language chaining
var chain = { get: function () { return this } }
;['should', 'to', 'be', 'have', 'been'].forEach(function (word) {
    Object.defineProperty(Asserter.prototype, word, chain)
})

// assertions
Asserter.prototype.visible = function () {
    var expected = !this.negate
    return this.browser.isVisible(this.selector, function (err, res) {
        assert.strictEqual(err, null)
        assert.strictEqual(res, expected)
    })
}

module.exports = Asserter