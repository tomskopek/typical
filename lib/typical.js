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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverlap = exports.deleter = exports.writer = exports.editor = exports.type = void 0;
const isObject_1 = __importDefault(require("./utils/isObject"));
function isOptionsInput(node) {
    return (0, isObject_1.default)(node) && 'node' in node;
}
function type(node, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        const nodeElement = isOptionsInput(node) ? node.node : node;
        for (const arg of args) {
            switch (typeof arg) {
                case 'string':
                    yield edit(node, arg);
                    break;
                case 'number':
                    yield wait(arg);
                    break;
                case 'function':
                    yield arg(nodeElement, ...args);
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
        const nodeElement = isOptionsInput(node) ? node.node : node;
        const textAccessor = isOptionsInput(node) && node.textAccessor ? node.textAccessor : 'textContent';
        // @ts-ignore
        const overlap = getOverlap(nodeElement[textAccessor], text);
        // @ts-ignore
        yield perform(node, [...deleter(nodeElement[textAccessor], overlap), ...writer(text, overlap)]);
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
        yield (node) => {
            const nodeElement = isOptionsInput(node) ? node.node : node;
            const textAccessor = isOptionsInput(node) && node.textAccessor ? node.textAccessor : 'textContent';
            // @ts-ignore
            requestAnimationFrame(() => nodeElement[textAccessor] = edit);
        };
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
