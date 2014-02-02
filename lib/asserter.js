var assert = require('assert')

function Asserter (browser, selector) {
    this.browser = browser
    this.selector = selector
    this.negate = false
}

function addProp (key, getter) {
    Object.defineProperty(Asserter.prototype, key, {
        get: getter
    })
}

function addMethod (key, fn) {
    Asserter.prototype[key] = fn
}

// enable chai-compatible language chaining
;[
    'should', 'to', 'be', 'been', 'is', 'and', 'has',
    'have', 'with', 'that', 'at', 'of', 'same'
].forEach(function (word) {
    addProp(word, function () { return this })
})

// negation
addProp('not', function () {
    this.negate = true
    return this
})

// assertion helpers ---

Asserter.prototype._msg = function (msg) {
    return '<' + this.selector + '> should ' + (this.negate ? 'not ' : '') + msg + '.'
}

Asserter.prototype._expect = function (msg, fn) {
    var msg = this._msg(msg),
        negate = this.negate
    return function (err, res) {
        assert.ok(!err, msg)
        res = fn ? fn(res) : res
        assert.ok(negate ? !res : res, msg)   
    }
}

// assertions ---

addProp('exist', function () {
    var negate = this.negate,
        msg = this._msg('exist')
    return this.browser.element(this.selector, function (err, res) {
        if (negate) {
            assert.ok(err || !res.value, msg)
        } else {
            assert.ok(!err && res.value, msg)
        }
    })
})

addProp('visible', function () {
    return this.browser.isVisible(
        this.selector,
        this._expect('be visible')
    )
})

addProp('selected', function () {
    return this.browser.isSelected(
        this.selector,
        this._expect('be selected')
    )
})

addMethod('text', function (text) {
    return this.browser.getText(
        this.selector,
        this._expect('have text: ' + text, function (res) {
            return res.indexOf(text) > -1
        })
    )
})

addMethod('value', function (value) {
    return this.browser.getValue(
        this.selector,
        this._expect('have value: ' + value, function (res) {
            return res === value
        })
    )
})

addMethod('attribute', function (attr, value) {
    var expect = arguments.length >= 2
        ? this._expect(
            'have attribute "' + attr + '" with value "' + value + '"',
            function (res) {
                return res === value
            }
        )
        : this._expect(
            'have attribute "' + attr + '"',
            function (res) {
                return res !== null
            }
        )
    return this.browser.getAttribute(this.selector, attr, expect)
})

addMethod('css', function (prop, value) {
    return this.browser.getCssProperty(
        this.selector, attr,
        this._expect(
            'have css "' + prop + '" with value "' + value + '"',
            function (res) {
                return res === value
            }
        )
    )
})

addMethod('count', function (n) {
    return this.browser.elements(
        this.selector,
        this._expect('have count: ' + n, function (res) {
            return res.value.length === n
        })
    )  
})

addMethod('location', function (x, y) {
    // todo
})

addMethod('size', function (w, h) {
    // todo
})

module.exports = Asserter