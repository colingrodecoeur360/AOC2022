import { expect } from "@test/unit";
import { part1, part2 } from "./example";

describe("example", () => {
    describe("part1", () => {
        it("should work", () => {
            const input = "toto";
            const result = part1(input);

            expect(result).to.equal(0);
        });
    });
    describe("part2", () => {
        it("should work", () => {
            const input = "tata";
            const result = part2(input);

            expect(result).to.equal(1);
        });
    });
});
