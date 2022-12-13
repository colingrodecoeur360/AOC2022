import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { part1, part2 } from "./day13";

describe("day13", () => {
    describe("part1", () => {
        it("should work", () => {
            const input = loadInput("day13", { filename: "input_test" });
            const result = part1(input);

            expect(result).to.equal(13);
        });
    });
    describe("part2", () => {
        it("should work", () => {
            const input = loadInput("day13", { filename: "input_test" });
            const result = part2(input);

            expect(result).to.equal(140);
        });
    });
});
