import { loadInput, sortNumbersDescending, splitIntegerLines } from "../utils";
import _ from "lodash";

export function day01() {
    const input = loadInput("day01");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

export function part1(input: string) {
    return _.max(computeCaloriesByElf(input));
}

export function part2(input: string) {
    return _.sum(sortNumbersDescending(computeCaloriesByElf(input)).slice(0, 3));
}

function computeCaloriesByElf(input: string) {
    return input.split("\n\n").map(chunk => _.sum(splitIntegerLines(chunk)));
}
