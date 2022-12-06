import { expect } from "@test/unit";
import { part1, part2 } from "./day06";

describe("day06", () => {
    describe("part1", () => {
        it("should work", () => {
            expect(part1("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).to.equal(7);
            expect(part1("bvwbjplbgvbhsrlpgdmjqwftvncz")).to.equal(5);
            expect(part1("nppdvjthqldpwncqszvftbrmjlhg")).to.equal(6);
            expect(part1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).to.equal(10);
            expect(part1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).to.equal(11);
        });
    });
    describe("part2", () => {
        it("should work", () => {
            expect(part2("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).to.equal(19);
            expect(part2("bvwbjplbgvbhsrlpgdmjqwftvncz")).to.equal(23);
            expect(part2("nppdvjthqldpwncqszvftbrmjlhg")).to.equal(23);
            expect(part2("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).to.equal(29);
            expect(part2("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).to.equal(26);
        });
    });
});
