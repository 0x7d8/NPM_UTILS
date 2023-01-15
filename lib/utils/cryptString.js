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
module.exports.encrypt = (options) => {
    const key = crypto.createHash('sha256').update(String(options.key)).digest('base64').substring(0, 32);
    const iv = Buffer.alloc(16, 0);
    const enCipher = crypto.createCipheriv(options.algorithm, key, iv);
    let encryptedData = enCipher.update(options.text);
    encryptedData = Buffer.concat([encryptedData, enCipher.final()]);
    return encryptedData.toString(options.output);
};
module.exports.decrypt = (options) => {
    const key = crypto.createHash('sha256').update(String(options.key)).digest('base64').substring(0, 32);
    const iv = Buffer.alloc(16, 0);
    const deCipher = crypto.createDecipheriv(options.algorithm, key, iv);
    let decryptedData = deCipher.update(Buffer.from(options.text, 'hex'));
    decryptedData = Buffer.concat([decryptedData, deCipher.final()]);
    return decryptedData.toString(options.output);
};
module.exports.hash = (options) => {
    let hash;
    if (options.output === 'bytes')
        hash = crypto.createHash(options.algorithm).update(String(options.text));
    else
        hash = crypto.createHash(options.algorithm).update(String(options.text)).digest(options.output);
    return hash;
};
//# sourceMappingURL=cryptString.js.map