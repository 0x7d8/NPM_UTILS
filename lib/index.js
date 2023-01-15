"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
module.exports = {
    /** Load an Env File to JSON */
    loadEnv(
    /** The path to the Env file */ filePath) {
        if (typeof filePath !== 'string')
            throw new TypeError('filePath must be a string');
        const content = fs.readFileSync(path.resolve(filePath), 'utf8');
        let returns = {};
        for (const line of content.split('\n')) {
            const keys = line.split(/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg);
            returns[keys[1]] = keys[2];
        }
        return returns;
    },
    /** Generate a Random Number */
    randomNum(
    /** The Minimum Number */ min, 
    /** The Maximum Number */ max, 
    /**
     * The Decimal Places to Generate
     * @default 0
    */ dec) {
        if (typeof min !== 'number')
            throw new TypeError('minimum must be a number');
        if (typeof max !== 'number')
            throw new TypeError('maximum must be a number');
        dec = dec ?? 0;
        const random = Math.random() * (max - min + 1) + min;
        const number = Math.floor(random * (10 ** dec)) / (10 ** dec);
        return number;
    },
    /** Generate a Random Boolean */
    randomBol() {
        const boolean = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        return (boolean === 1);
    },
    /** Generate a Random String */
    randomStr(options) {
        if (typeof options !== 'object')
            throw new TypeError('options must be an object');
        const length = options.length ?? 12;
        const numbers = options.numbers ?? true;
        const symbols = options.symbols ?? false;
        const uppercase = options.uppercase ?? true;
        const lowercase = options.lowercase ?? true;
        const exclude = options.exclude ?? '';
        const string = require('./utils/randomString').generate({
            length, numbers, symbols, uppercase, lowercase, exclude
        });
        return string;
    },
    /** Generate a Text Spinner */
    spinner: class spinner {
        constructor() {
            this.state = 0;
            this.states = [
                '/', '-',
                '\\', '|'
            ];
        }
        get() {
            if (this.state >= 4)
                this.state = 0;
            this.state++;
            return this.states[this.state - 1];
        }
    },
    /** Encrypt a String */
    encryptStr(options) {
        if (typeof options !== 'object')
            throw new TypeError('options must be an object');
        const text = options.text ?? 'Javascript Moment';
        const algorithm = options.algorithm ?? 'aes-256-cbc';
        const output = options.output ?? 'hex';
        const key = options.key ?? '123unsafe';
        const data = require('./utils/cryptString').encrypt({
            text, algorithm, output, key
        });
        return data;
    },
    /** Decrypt a String */
    decryptStr(options) {
        if (typeof options !== 'object')
            throw new TypeError('options must be an object');
        const text = options.text ?? 'Javascript Moment';
        const algorithm = options.algorithm ?? 'aes-256-cbc';
        const output = options.output ?? 'utf8';
        const key = options.key ?? '123unsafe';
        const data = require('./utils/cryptString').decrypt({
            text, algorithm, output, key
        });
        return data;
    },
    /** Hash a String */
    hashStr(options) {
        if (typeof options !== 'object')
            throw new TypeError('options must be an object');
        const text = options.text ?? 'Javascript Moment';
        const algorithm = options.algorithm ?? 'sha256';
        const output = options.output ?? 'hex';
        const data = require('./utils/cryptString').hash({
            text, algorithm, output
        });
        return data;
    },
};
//# sourceMappingURL=index.js.map