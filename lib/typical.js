"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverlap = exports.deleter = exports.writer = exports.editor = exports.type = void 0;
function type(node, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const arg of args) {
            switch (typeof arg) {
                case 'string':
                    yield edit(node, arg);
                    break;
                case 'number':
                    yield wait(arg);
                    break;
                case 'function':
                    yield arg(node, ...args);
                    break;
                default:
                    yield arg;
            }
        }
    });
}
exports.type = type;
function edit(node, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const overlap = getOverlap(node.textContent, text);
        yield perform(node, [...deleter(node.textContent, overlap), ...writer(text, overlap)]);
    });
}
function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, ms));
    });
}
function perform(node, edits, speed = 60) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const op of editor(edits)) {
            op(node);
            yield wait(speed + speed * (Math.random() - 0.5));
        }
    });
}
function* editor(edits) {
    for (const edit of edits) {
        yield (node) => requestAnimationFrame(() => node.textContent = edit);
    }
}
exports.editor = editor;
function* writer([...text], startIndex = 0, endIndex = text.length) {
    while (startIndex < endIndex) {
        yield text.slice(0, ++startIndex).join('');
    }
}
exports.writer = writer;
function* deleter([...text], startIndex = 0, endIndex = text.length) {
    while (endIndex > startIndex) {
        yield text.slice(0, --endIndex).join('');
    }
}
exports.deleter = deleter;
function getOverlap(start, [...end]) {
    return [...start, NaN].findIndex((char, i) => end[i] !== char);
}
exports.getOverlap = getOverlap;
