# Whipcream

Chai-style chaining sugar for webdriverjs.

``` js
var webdriverjs = require('webdriverjs'),
    whipcream = require('whipcream')

whipcream.addTo(webdriverjs)

webdriverjs
    .remote()
    .init()
    .url('...')
    // should style
    .$('#message')
        .should.exist
        .should.be.visible
        .should.have.text('hello')
    // expect style
    .expect('#footer')
        .to.be.visible
        .to.have.css('color', 'black')
    .end()
```