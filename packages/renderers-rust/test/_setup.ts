import { expect } from 'vitest';

export function codeContains(actual: string, expected: RegExp | RegExp[] | string[] | string) {
    const expectedArray = Array.isArray(expected) ? expected : [expected];
    expectedArray.forEach(e => {
        if (typeof e === 'string') {
            expect(actual).toContain(e);
        } else {
            expect(actual).toMatch(e);
        }
    });
}
