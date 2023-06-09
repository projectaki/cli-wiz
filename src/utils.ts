export function typedKeys<T extends {}>(obj: T) {
    return Object.keys(obj) as Array<keyof T>;
}

export function extractCodeBlock(markdownString: string) {
    const regex = /```[\w-]*(\r\n|\r|\n)([^`]+)```/g;

    const matches = regex.exec(markdownString);

    const codeBlock = matches && matches.length > 1 ? matches[2] : null;
    
    return codeBlock;
  }