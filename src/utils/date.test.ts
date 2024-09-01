import {formatDateTime} from "./date";

describe("date", () => {
    test("should format date and time", () => {
        const date = "2024-09-01T11:45:58.043Z";
        expect(formatDateTime(date)).toBe("01 Sep 2024, 17:15");
    });
});