declare var __DEV__: boolean;

// quick mod to the invariant function
// while the PR to add the asserts condition PR is still in review
// https://github.com/alexreardon/tiny-invariant/pull/47
declare module 'tiny-invariant' {
    export default function invariant(condition: any, message?: string): asserts condition;
}