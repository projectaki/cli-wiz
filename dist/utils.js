export function typedKeys(obj) {
    return Object.keys(obj);
}
export function extractCodeBlock(markdownString) {
    const regex = /```[\w-]*(\r\n|\r|\n)([^`]+)```/g;
    const matches = regex.exec(markdownString);
    const codeBlock = matches && matches.length > 1 ? matches[2] : null;
    return codeBlock;
}
