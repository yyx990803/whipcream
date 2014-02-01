var wd = require('wd')

function assert (q, expect) {
    return (expect === undefined || expect)
        ? q.should
        : q.should.not
}

function queryAttr (selector, attr) {
    return 'document.querySelector("' + selector + '").' + attr
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
        this.eval('document.querySelectorAll("' + selector + '").length'),
        expect
    ).become(count)
}

exports.assertText = function (selector, text, expect) {
    return assert(
        this.eval(queryAttr(selector, 'textContent')),
        expect
    ).eventually.include(text)
}

exports.assertAttribute = function (selector, attr, value, expect) {
    return assert(
        this.eval(queryAttr(selector, attr)),
        expect
    ).become(value)
}

// commands ---

exports.sendKeys = function (selector, text, enter) {
    return this.elementByCssSelector(selector)
        .type(text + (enter ? wd.SPECIAL_KEYS.Enter : ''))
}

exports.sendClick = function (selector) {
    return this.elementByCssSelector(selector).click()
}