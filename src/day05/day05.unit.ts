import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { part1, part2 } from "./day05";

describe("day05", () => {
    describe("part1", () => {
        it("should work", () => {
            const input = loadInput("day05", { filename: "input_test" });
            const result = part1(input);

            expect(result).to.equal("CMZ");
        });
    });
    describe("part2", () => {
        it("should work", () => {
            const input = loadInput("day05", { filename: "input_test" });
            const result = part2(input);

            expect(result).to.equal("MCD");
        });
    });
});
