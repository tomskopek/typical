"use strict";
// Credit: https://stackoverflow.com/questions/8834126/how-to-efficiently-check-if-variable-is-array-or-object-in-nodejs-v8
Object.defineProperty(exports, "__esModule", { value: true });
function isObject(maybeObject) {
    return !!maybeObject && maybeObject.constructor === Object;
}
exports.default = isObject;
