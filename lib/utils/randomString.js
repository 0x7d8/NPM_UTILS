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
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
let randomIndex;
let randomBytes;
const getNextRandomValue = () => {
    if (randomIndex === undefined || randomIndex >= randomBytes.length) {
        randomIndex = 0;
        randomBytes = crypto.randomBytes(256);
    }
    const result = randomBytes[randomIndex];
    randomIndex += 1;
    return result;
};
const randomNumber = (max) => {
    let rand = getNextRandomValue();
    while (rand >= 256 - (256 % max))
        rand = getNextRandomValue();
    return rand % max;
};
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~';
const generate = (options, pool) => {
    const optionsLength = options.length;
    const poolLength = pool.length;
    let password = '';
    for (let i = 0; i < optionsLength; i++)
        password += pool[randomNumber(poolLength)];
    return password;
};
module.exports.generate = (options) => {
    options = options || {};
    if (!('length' in options))
        options.length = 10;
    if (!('number' in options))
        options.numbers = false;
    if (!('symbols' in options))
        options.symbols = false;
    if (!('uppercase' in options))
        options.uppercase = true;
    if (!('lowercase' in options))
        options.lowercase = true;
    if (!('exclude' in options))
        options.exclude = '';
    let pool = '';
    if (options.lowercase)
        pool += lowercase;
    if (options.uppercase)
        pool += uppercase;
    if (options.numbers)
        pool += numbers;
    if (options.symbols) {
        if (typeof options.symbols === 'string')
            pool += options.symbols;
        else
            pool += symbols;
    }
    if (!pool) {
        throw new TypeError('At least one rule must be true');
    }
    ;
    let i = options.exclude.length;
    while (i--) {
        pool = pool.replace(options.exclude[i], '');
    }
    const password = generate(options, pool);
    return password;
};
//# sourceMappingURL=randomString.js.map