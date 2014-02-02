# Whipcream

Chai-style chaining sugar for webdriverjs.

``` js
var webdriverjs = require('webdriverjs')

// invoke whipcream augmentation
require('whipcream')()

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