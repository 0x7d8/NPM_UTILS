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
var randomString_exports = {};
__export(randomString_exports, {
  password: () => password
});
module.exports = __toCommonJS(randomString_exports);
var crypto = __toESM(require("crypto"));
let randomIndex;
let randomBytes;
const getNextRandomValue = () => {
  if (randomIndex === void 0 || randomIndex >= randomBytes.length) {
    randomIndex = 0;
    randomBytes = crypto.randomBytes(256);
  }
  const result = randomBytes[randomIndex];
  randomIndex += 1;
  return result;
};
const randomNumber = (max) => {
  let rand = getNextRandomValue();
  while (rand >= 256 - 256 % max)
    rand = getNextRandomValue();
  return rand % max;
};
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~';
const generate = (options, pool) => {
  var _a;
  const optionsLength = (_a = options.length) != null ? _a : 12;
  const poolLength = pool.length;
  let password2 = "";
  for (let i = 0; i < optionsLength; i++)
    password2 += pool[randomNumber(poolLength)];
  return password2;
};
const password = (options) => {
  var _a, _b;
  options = options || {};
  if (!("length" in options))
    options.length = 10;
  if (!("number" in options))
    options.numbers = false;
  if (!("symbols" in options))
    options.symbols = false;
  if (!("uppercase" in options))
    options.uppercase = true;
  if (!("lowercase" in options))
    options.lowercase = true;
  if (!("exclude" in options))
    options.exclude = "";
  let pool = "";
  if (options.lowercase)
    pool += lowercase;
  if (options.uppercase)
    pool += uppercase;
  if (options.numbers)
    pool += numbers;
  if (options.symbols) {
    if (typeof options.symbols === "string")
      pool += options.symbols;
    else
      pool += symbols;
  }
  if (!pool) {
    throw new TypeError("At least one rule must be true");
  }
  ;
  let i = (_b = (_a = options.exclude) == null ? void 0 : _a.length) != null ? _b : 0;
  while (i--) {
    pool = pool.replace(options.exclude[i], "");
  }
  const password2 = generate(options, pool);
  return password2;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  password
});
