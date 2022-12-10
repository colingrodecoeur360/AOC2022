import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { part1, part2 } from "./day10";

describe("day10", () => {
    describe("part1", () => {
        it("should work", () => {
            const input = loadInput("day10", { filename: "input_test" });
            const result = part1(input);

            expect(result).to.equal(13140);
        });
    });
    describe("part2", () => {
        it("should work", () => {
            const input = loadInput("day10", { filename: "input_test" });
            const result = part2(input);

            expect(result).to.deep.equal([
                "##..##..##..##..##..##..##..##..##..##..",
                "###...###...###...###...###...###...###.",
                "####....####....####....####....####....",
                "#####.....#####.....#####.....#####.....",
                "######......######......######......####",
                "#######.......#######.......#######.....",
            ].map(row => row.trim()).join("\n"));
        });
    });
});
