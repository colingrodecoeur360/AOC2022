import { loadInput } from "../utils";

export function day06() {
    const input = loadInput("day06");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

export function part1(input: string) {
    return getStartOfPacketMarker(input, 4);
}

export function part2(input: string) {
    return getStartOfPacketMarker(input, 14);
}

function getStartOfPacketMarker(input: string, windowSize: number) {
    let currentIndex = windowSize;
    while (getUniqueCharactersInWindow(currentIndex) < windowSize) { currentIndex++; }
    return currentIndex;

    function getUniqueCharactersInWindow(index: number) {
        const characters = input.slice(index - windowSize, index);
        return new Set(characters).size;
    }
}
