var keys = require('./keys')

exports.addTo = function (proto) {

    proto.type = function (text) {
        return this.setValue(this.__wc_selector, text)
    }

    proto.key = function (keyname) {
        return this.addValue(this.__wc_selector, [keys[keyname]])
    }

    proto.enter = function () {
        return this.key('Enter').key('Return')
    }

}