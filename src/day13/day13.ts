import { loadInput } from "../utils";

export function day13() {
    const input = loadInput("day13");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

type Packet = (Packet | number)[];

export function part1(input: string) {
    const packetPairs = parseInput(input);
    let score = 0;

    for (let i = 0; i < packetPairs.length; i++) {
        const [left, right] = packetPairs[i];
        if (areOrdered(left, right)) { score += i + 1; }
    }

    return score;

    function parseInput(input: string) {
        return input.trim().split("\n\n").map((chunk) => {
            return chunk.split("\n").map(line => JSON.parse(line)) as [Packet, Packet];
        });
    }
}

export function part2(input: string) {
    const packets = parseInput(input);

    const orderedPackets = packets.sort((packet1, packet2) => {
        const isRightOrder = areOrdered(packet1, packet2);
        if (isRightOrder === true) { return -1; }
        if (isRightOrder === false) { return 1; }
        return 0;
    });

    const stringifiedOrderedPackets = orderedPackets.map(packet => JSON.stringify(packet));
    const delimiter1Index = stringifiedOrderedPackets.indexOf("[[2]]") + 1;
    const delimiter2Index = stringifiedOrderedPackets.indexOf("[[6]]") + 1;

    return delimiter1Index * delimiter2Index;

    function parseInput(input: string): Packet[] {
        return input.trim().split("\n").filter(Boolean).map((line) => JSON.parse(line)).concat([[[2]], [[6]]]);
    }
}

function areOrdered(left: Packet, right: Packet): boolean | undefined {
    const nbLeft = left.length;
    const nbRight = right.length;

    for (let i = 0; i < Math.min(nbLeft, nbRight); i++) {
        if (typeof left[i] === "number" && typeof right[i] === "number") {
            if (left[i] < right[i]) { return true; }
            if (left[i] > right[i]) { return false; }
            continue;
        }
        const childLeft = typeof left[i] === "number" ? [left[i]] : left[i] as Packet;
        const childRight = typeof right[i] === "number" ? [right[i]] : right[i] as Packet;

        const isRightOrder = areOrdered(childLeft, childRight);
        if (typeof isRightOrder === "boolean") { return isRightOrder; }
    }

    if (nbLeft < nbRight) { return true; }
    if (nbLeft > nbRight) { return false; }

    return undefined;
}
