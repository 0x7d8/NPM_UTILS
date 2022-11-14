const path = require('node:path')
const fs = require('node:fs')

module.exports = {
    /**
    * Load an Env File
    *
    * @param {String} filePath The path to the Env file
    */
    loadEnv(filePath) {
        if (typeof filePath !== 'string') throw new TypeError('filePath must be a string')

        const content = fs.readFileSync(path.resolve(filePath), 'utf8')

        let returns = {}
        for (const line of content.split('\n')) {
            const keys = line.split(/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg)
            returns[keys[1]] = keys[2]
        }
        
        return returns
    },

    /**
    * Generate a Random Number
    *
    * @param {Number} min The Minimum Number
    * @param {Number} max The Maximum Number
    */
    randomNum(min, max) {
        if (typeof min !== 'number') throw new TypeError('minimum must be a number')
        if (typeof max !== 'number') throw new TypeError('maximum must be a number')

        const number = Math.floor(Math.random() * (max - min + 1)) + min
        return number
    },

    /**
    * Generate a Random String
    *
    * @typedef {Object} randomStr { pages: Object, events: Object, urls: RouteList, bind: String, cors: Boolean, port: Number, body: Number }
    * @prop {Number} length The Length of the String
    * @prop {Boolean} numbers Whether Numbers should be included
    * @prop {Boolean} symbols Whether Symbols should be included
    * @prop {Boolean} uppercase Whether Uppercase letters should be included
    * @prop {Boolean} lowercase Whether Lowercase letters should be included
    * @prop {String} exclude Characters that should not be included
    * 
    * @param {randomStr} options
    */
    randomStr(options) {
        if (typeof options !== 'object') throw new TypeError('options must be an object')

        const string = require('./utils/randomString').generate(options)
        return string
    }
}