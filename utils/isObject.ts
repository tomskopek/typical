// Credit: https://stackoverflow.com/questions/8834126/how-to-efficiently-check-if-variable-is-array-or-object-in-nodejs-v8

export default function isObject(maybeObject: any) : maybeObject is object {
    return !!maybeObject && maybeObject.constructor === Object;
}
