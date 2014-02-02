# Whipcream

Should-style chaining sugar for webdriverjs.

``` js
var webdriverjs = require('webdriverjs'),
    whipcream = require('../')

whipcream.addTo(webdriverjs)

webdriverjs
    .remote()
    .init()
    .url('...')
    .$('#message')
        .should.exist
        .should.be.visible
        .should.have.text('hello')
    .$('.items')
        .should.have.count(5)
    .end()

```