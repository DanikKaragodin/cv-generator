declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}
declare module '*.ttf' {
    const path: string;
    export default path;
}
declare module '*.woff' {
    const path: string;
    export default path;
}

declare module '*.woff2' {
    const path: string;
    export default path;
}
