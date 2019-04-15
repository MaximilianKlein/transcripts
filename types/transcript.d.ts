// Type definitions for transcripts 1.0.0
// Project: smartlist
// Definitions by: jim van kleef jim.van.kleef@freiheit.com
declare module 'transcripts' {
    type Extractor = (item: any) => string
    export function findSimilar(list: Array<any>, what: string, itemExtractor: Extractor, confidence?: number): number;
}
