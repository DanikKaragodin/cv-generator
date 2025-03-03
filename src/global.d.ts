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

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
