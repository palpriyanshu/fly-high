import {formatDateTime} from "./date";

describe('date', () => {
    test('should format date and time', () => {
        const date = new Date("2024-08-31T19:13:01.685Z").toUTCString();
        expect(formatDateTime(date)).toBe("01 Sep 2024, 00:43");
    });
});