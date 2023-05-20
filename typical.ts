import isObject from './utils/isObject';

type Options = {
    node: Node,
    textAccessor?: 'textContent' | 'placeholder' | 'value'
}
type NodeInput = Node | Options
type ArgsType = Array<string | number | ((node: NodeInput, ...args: ArgsType) => void)>

function isOptionsInput(node: NodeInput): node is Options {
    return isObject(node) && 'node' in node;
}

export async function type(node: NodeInput, ...args: ArgsType) {
    const nodeElement = isOptionsInput(node) ? node.node : node;

    for (const arg of args) {
        switch (typeof arg) {
            case 'string':
                await edit(node, arg);
                break;
            case 'number':
                await wait(arg);
                break;
            case 'function':
                await arg(node, ...args);
                break;
            default:
                await arg;
        }
    }
}

async function edit(node: NodeInput, text: string) {
    const nodeElement = isOptionsInput(node) ? node.node : node;
    const textAccessor = isOptionsInput(node) && node.textAccessor ? node.textAccessor : 'textContent';

    // @ts-ignore
    const overlap = getOverlap(nodeElement[textAccessor] as string, text);
    // @ts-ignore
    await perform(node, [...deleter(nodeElement[textAccessor] as string, overlap), ...writer(text, overlap)]);
}

async function wait(ms: number) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function perform(node: NodeInput, edits: Array<string>, speed = 60) {
    for (const op of editor(edits)) {
        op(node);
        await wait(speed + speed * (Math.random() - 0.5));
    }
}

export function* editor(edits: Array<string>) {
    for (const edit of edits) {
        yield (node: NodeInput) => {
            const nodeElement = isOptionsInput(node) ? node.node : node;
            const textAccessor = isOptionsInput(node) && node.textAccessor ? node.textAccessor : 'textContent';
            // @ts-ignore
            requestAnimationFrame(() => nodeElement[textAccessor] = edit);
        }
    }
}

export function* writer([...text], startIndex = 0, endIndex = text.length) {
    while (startIndex < endIndex) {
        yield text.slice(0, ++startIndex).join('');
    }
}

export function* deleter([...text]: string, startIndex = 0, endIndex = text.length) {
    while (endIndex > startIndex) {
        yield text.slice(0, --endIndex).join('');
    }
}

export function getOverlap(start: string, [...end]) {
    return [...start, NaN].findIndex((char, i) => end[i] !== char);
}
