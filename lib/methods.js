var wd = require('wd')

function assert (q, expect) {
    return (expect === undefined || expect)
        ? q.should
        : q.should.not
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
        this.eval('document.querySelector("' + selector + '").textContent'),
        expect
    ).eventually.include(text)
}

// commands ---

exports.sendKeys = function (selector, text, enter) {
    return this.elementByCssSelector(selector)
        .type(text + (enter ? wd.SPECIAL_KEYS.Enter : ''))
}

exports.sendClick = function (selector) {
    return this.elementByCssSelector(selector).click()
}