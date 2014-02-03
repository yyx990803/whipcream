# Whipcream (WIP)

Chai-style chaining sugar for webdriverjs. It allows you to write test like this:

``` js
describe('todomvc', function () {
    
    before(function (done) {
        browser
            .url(url)
            .waitFor('#todoapp', 1000, done)
    })
    
    it('initialization', function (done) {
        browser
            .$('#main').should.not.be.visible
            .$('#footer').should.not.be.visible
            .$('#filters .selected')
                .should.have.count(1)
                .should.have.property('textContent', 'All')
            .call(done)
    })

    it('create new todo', function (done) {
        browser
            .$('#new-todo').enter('test1').key('Enter')
            .$('.todo').should.have.count(1)
            .$('.todo .edit').should.not.be.visible
            .$('.todo label').should.have.text('test1')
            .$('#todo-count strong').should.have.text('1')
            .$('.todo .toggle').should.not.be.checked
            .$('#main').should.be.visible
            .$('#footer').should.be.visible
            .$('#clear-completed').should.not.be.visible
            .$('#new-todo').should.have.value('')
            .call(done)
    })

    ...
    
})
```