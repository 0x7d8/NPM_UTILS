"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var cryptString_exports = {};
__export(cryptString_exports, {
  decrypt: () => decrypt,
  encrypt: () => encrypt,
  hash: () => hash
});
module.exports = __toCommonJS(cryptString_exports);
var crypto = __toESM(require("crypto"));
const encrypt = (options) => {
  const key = crypto.createHash("sha256").update(String(options.key)).digest("base64").substring(0, 32);
  const iv = Buffer.alloc(16, 0);
  const enCipher = crypto.createCipheriv(options.algorithm, key, iv);
  let encryptedData = enCipher.update(options.text);
  encryptedData = Buffer.concat([encryptedData, enCipher.final()]);
  return encryptedData.toString(options.output);
};
const decrypt = (options) => {
  const key = crypto.createHash("sha256").update(String(options.key)).digest("base64").substring(0, 32);
  const iv = Buffer.alloc(16, 0);
  const deCipher = crypto.createDecipheriv(options.algorithm, key, iv);
  let decryptedData = deCipher.update(Buffer.from(options.text, "hex"));
  decryptedData = Buffer.concat([decryptedData, deCipher.final()]);
  return decryptedData.toString(options.output);
};
const hash = (options) => {
  let hash2;
  if (options.output === "bytes")
    hash2 = crypto.createHash(options.algorithm).update(String(options.text));
  else
    hash2 = crypto.createHash(options.algorithm).update(String(options.text)).digest(options.output);
  return hash2;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  decrypt,
  encrypt,
  hash
});
