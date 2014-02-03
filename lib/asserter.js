var assert = require('assert')

function Asserter (browser, selector) {
    this.browser = browser
    this.selector = selector
    this._negate = false
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
var not = function () {
    this._negate = true
    return this
}
addProp('no', not)
addProp('not', not)

// exact
var exact = function () {
    this._exact = true
    return this
}
addProp('exact', exact)
addProp('exactly', exact)

// assertion helpers ---

Asserter.prototype._msg = function (msg) {
    return '<' + this.selector + '> should ' + (this._negate ? 'not ' : '') + msg + '.'
}

Asserter.prototype._expect = function (msg, fn) {
    var msg = this._msg(msg),
        negate = this._negate
    return function (err, res) {
        assert.ok(!err, msg)
        res = fn ? fn(res) : res
        assert(negate ? !res : res, msg)
    }
}

// assertions ---

addProp('exist', function () {
    var negate = this._negate,
        msg = this._msg('exist')
    return this.browser.element(this.selector, function (err, res) {
        if (negate) {
            assert(err || !res.value, msg)
        } else {
            assert(!err && res.value, msg)
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

addProp('checked', function () {
    return this.property('checked', true)
})

addProp('focused', function () {
    return this.browser.execute(
        'return document.querySelector("' + this.selector + '") === document.activeElement',
        this._expect('have focus')
    )
})

addMethod('text', function (text) {
    var exact = this._exact
    return this.browser.getText(
        this.selector,
        this._expect('have text: ' + text, function (res) {
            return exact
                ? res === text
                : res.indexOf(text) > -1
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

addMethod('property', function (prop, value) {
    if (arguments.length >= 2) {
        return this.browser.execute(
            'return document.querySelector("' + this.selector + '").' + prop,
            this._expect(
                'have property "' + prop + '" with value "' + value + '"',
                function (res) {
                    return res.value === value
                }
            )
        )
    } else {
        return this.browser.execute(
            'return "' + prop + '" in document.querySelector("' + this.selector + '")',
            this._expect('have property "' + prop + '"')
        )
    }
})

addMethod('class', function (expectedClass) {
    return this.browser.getAttribute(
        this.selector, 'class',
        this._expect('have class: ', function (res) {
            return (' ' + res + ' ').indexOf(' ' + expectedClass + ' ') > -1
        })
    )
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