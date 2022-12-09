import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { part1, part2 } from "./day09";

describe("day09", () => {
    describe("part1", () => {
        it("should work", () => {
            const input = loadInput("day09", { filename: "input_test" });
            const result = part1(input);

            expect(result).to.equal(13);
        });
    });
    describe("part2", () => {
        it("should work", () => {
            const input = loadInput("day09", { filename: "input_test" });
            const result = part2(input);

            expect(result).to.equal(1);
        });
        it("should work on larger example", () => {
            const input = loadInput("day09", { filename: "input_test2" });
            const result = part2(input);

            expect(result).to.equal(36);
        });
    });
});
