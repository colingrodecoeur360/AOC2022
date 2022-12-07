import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { part1, part2 } from "./day07";

describe("day07", () => {
    describe("part1", () => {
        it("should work", () => {
            const input = loadInput("day07", { filename: "input_test" });
            const result = part1(input);

            expect(result).to.equal(95437);
        });
    });
    describe("part2", () => {
        it("should work", () => {
            const input = loadInput("day07", { filename: "input_test" });
            const result = part2(input);

            expect(result).to.equal(24933642);
        });
    });
});
