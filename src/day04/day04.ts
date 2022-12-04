import { loadInput, splitLines, toInt } from "../utils";

export function day04() {
    const input = loadInput("day04");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

type Assignment = [[number, number], [number, number]];

export function part1(input: string) {
    const assignments = parseInput(input);
    return assignments.filter(hasInclusion).length;

    function hasInclusion([[min1, max1], [min2, max2]]: Assignment) {
        return (min1 <= min2 && max2 <= max1) || (min2 <= min1 && max1 <= max2);
    }
}

export function part2(input: string) {
    const assignments = parseInput(input);
    return assignments.filter(hasOverlap).length;

    function hasOverlap([[min1, max1], [min2, max2]]: Assignment) {
        return (min1 <= min2 && min2 <= max1) || (min2 <= min1 && min1 <= max2);
    }
}

function parseInput(input: string) {
    return splitLines(input).map(parseLine);
}
function parseLine(line: string) {
    return line.split(",").map(elf => elf.split("-").map(toInt)) as Assignment;
}
