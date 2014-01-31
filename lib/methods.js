function guard (expect) {
    return expect === undefined || expect
}

exports.assertVisible = function (selector, expect) {
    return this.elementByCssSelector(selector)
        .isDisplayed().should.become(guard(expect))
}

exports.assertCount = function (selector, count, expect) {
    var q = this.eval('document.querySelectorAll("' + selector + '").length')
        .should
    return (guard(expect) ? q : q.not).become(count)
}

exports.assertText = function (selector, text, expect) {
    var q = this.eval('document.querySelector("' + selector + '").textContent')
        .should
    return (guard(expect) ? q : q.not).eventually.become(text)
}

exports.assertMatchText = function (selector, text, expect) {
    var q = this.eval('document.querySelector("' + selector + '").textContent')
        .should
    return (guard(expect) ? q : q.not).eventually.include(text)
}

exports.sendKeys = function (selector, text, enter) {
    return this.elementByCssSelector(selector)
        .type(text + (enter ? wd.SPECIAL_KEYS.Enter : ''))
}