type ArgsType = Array<string | number | ((node: Node, ...args: ArgsType) => void)>

export async function type(node: Node, ...args: ArgsType) {
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

async function edit(node: Node, text: string) {
    const overlap = getOverlap(node.textContent as string, text);
    await perform(node, [...deleter(node.textContent as string, overlap), ...writer(text, overlap)]);
}

async function wait(ms: number) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function perform(node: Node, edits: Array<string>, speed = 60) {
    for (const op of editor(edits)) {
        op(node);
        await wait(speed + speed * (Math.random() - 0.5));
    }
}

export function* editor(edits: Array<string>) {
    for (const edit of edits) {
        yield (node: Node) => requestAnimationFrame(() => node.textContent = edit);
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
