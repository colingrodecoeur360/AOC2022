import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { part1, part2 } from "./day14";

describe("day14", () => {
    describe("part1", () => {
        it("should work", () => {
            const input = loadInput("day14", { filename: "input_test" });
            const result = part1(input);

            expect(result).to.equal(24);
        });
    });
    describe("part2", () => {
        it("should work", () => {
            const input = loadInput("day14", { filename: "input_test" });
            const result = part2(input);

            expect(result).to.equal(93);
        });
    });
});
