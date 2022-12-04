import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { part1, part2 } from "./day02";

describe("day02", () => {
    describe("part1", () => {
        it("should work", () => {
            const input = loadInput("day02", { filename: "input_test" });
            const result = part1(input);

            expect(result).to.equal(15);
        });
    });
    describe("part2", () => {
        it("should work", () => {
            const input = loadInput("day02", { filename: "input_test" });
            const result = part2(input);

            expect(result).to.equal(12);
        });
    });
});
