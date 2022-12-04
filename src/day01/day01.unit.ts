import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { part1, part2 } from "./day01";

describe("day01", () => {
    describe("part1", () => {
        it("should work", () => {
            const input = loadInput("day01", { filename: "input_test" });
            const result = part1(input);

            expect(result).to.equal(24000);
        });
    });
    describe("part2", () => {
        it("should work", () => {
            const input = loadInput("day01", { filename: "input_test" });
            const result = part2(input);

            expect(result).to.equal(45000);
        });
    });
});
