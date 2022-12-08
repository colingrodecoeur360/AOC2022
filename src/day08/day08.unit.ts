import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { part1, part2 } from "./day08";

describe("day08", () => {
    describe("part1", () => {
        it("should work", () => {
            const input = loadInput("day08", { filename: "input_test" });
            const result = part1(input);

            expect(result).to.equal(21);
        });
    });
    describe("part2", () => {
        it.only("should work", () => {
            const input = loadInput("day08", { filename: "input_test" });
            const result = part2(input);

            expect(result).to.equal(8);
        });
    });
});
