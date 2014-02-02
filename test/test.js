var webdriverjs = require('webdriverjs'),
    whipcream = require('../')

whipcream.addTo(webdriverjs)

describe('whipcream', function () {

    var browser

    before(function (done) {
        browser = webdriverjs
            .remote({ desiredCapabilities: { browserName: 'chrome' }})
            .init()
            .url('http://localhost:8081/examples/todomvc/index.html?test=1')
            .waitFor('#todoapp', 1000, done)
    })
    
    it('should work', function (done) {
        browser
            .$('#main')
                .should.exist
                .should.not.be.visible
                .should.have.attribute('id', 'main')
                .should.have.count(1)
            .$('#footer')
                .should.not.be.visible
            .expect('#new-todo')
                .to.be.visible
                .to.have.value('')
            .call(done)
    })

    after(function (done) {
        browser.end(done)
    })

})