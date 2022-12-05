import { loadInput, splitLines } from "../utils";

export function example() {
    const input = loadInput("example");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

export function part1(input: string) {
    const parsedInput = parseInput(input);
    return 0;
}

export function part2(input: string) {
    const parsedInput = parseInput(input);
    return 1;
}

function parseInput(input: string) {
    return splitLines(input);
}
