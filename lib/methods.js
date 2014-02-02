var wd = require('wd')

function assert (q, expect) {
    return (expect === undefined || expect)
        ? q.should
        : q.should.not
}

function queryAttr (selector, attr) {
    return 'document.querySelector("' + selector + '").' + attr
}

// commands ---

exports.sendKeys = function (selector, text, enter) {
    return this.elementByCssSelector(selector)
        .type(text + (enter ? wd.SPECIAL_KEYS.Enter : ''))
}

exports.sendClick = function (selector) {
    return this.elementByCssSelector(selector).click()
}

// assertions ---

exports.assertVisible = function (selector, expect) {
    return assert(
        this.elementByCssSelector(selector).isDisplayed(),
        expect
    ).become(true)
}

exports.assertCount = function (selector, count, expect) {
    return assert(
        this.elementsByCssSelector(selector),
        expect
    ).eventually.have.length(count)
}

exports.assertText = function (selector, text, expect) {
    return assert(
        this.elementByCssSelector(selector).text(),
        expect
    ).eventually.include(text)
}

exports.assertAttribute = function (selector, attr, value, expect) {
    var q = assert(
        this.elementByCssSelector(selector).getAttribute(attr),
        expect
    ).eventually
    return value
        ? q.include(value)
        : q.not.be.ok
}

exports.assertProperty = function (selector, prop, value, expect) {
    return assert(
        this.eval('document.querySelector("' + selector + '").' + prop),
        expect
    ).become(value)
}