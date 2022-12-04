import { loadInput } from "../utils";

export function example() {
    const input = loadInput("example");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

export function part1(input: any) {
    return 0;
}

export function part2(input: any) {
    return 1;
}
