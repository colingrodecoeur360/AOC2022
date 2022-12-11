import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { part1, part2 } from "./day11";

describe("day11", () => {
    describe("part1", () => {
        it("should work", () => {
            const input = loadInput("day11", { filename: "input_test" });
            const result = part1(input);

            expect(result).to.equal(10605);
        });
    });
    describe("part2", () => {
        it("should work", () => {
            const input = loadInput("day11", { filename: "input_test" });
            const result = part2(input);

            expect(result).to.equal(2713310158);
        });
    });
});
