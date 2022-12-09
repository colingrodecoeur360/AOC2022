import { loadInput, splitLines, toInt } from "../utils";

export function day09() {
    const input = loadInput("day09");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

export function part1(input: string) {
    const instructions = parseInput(input);
    return computeVisitedCells(instructions, { ropeLength: 2 }).size;
}

export function part2(input: string) {
    const instructions = parseInput(input);
    return computeVisitedCells(instructions, { ropeLength: 10 }).size;
}

type Position = { x: number, y: number };
type Direction = "U" | "R" | "D" | "L";
type Instruction = {
    direction: Direction;
    value: number;
};

function parseInput(input: string): Instruction[] {
    return splitLines(input).map((row) => {
        const [direction, value] = row.split(" ");
        return {
            direction: direction as Direction,
            value: toInt(value)
        };
    });
}

function computeVisitedCells(instructions: Instruction[], { ropeLength }: { ropeLength: number }) {
    let positions = Array(ropeLength).fill(0).map(() => ({ x: 0, y: 0 }));

    const visitedCellsSet = buildVisitedCellsSet();
    visitedCellsSet.add({ x: 0, y: 0 });

    instructions.forEach(({ direction, value }) => {
        for (let step = 0; step < value; step++) {
            const head = positions[0];

            if (direction === "U") { head.y++; }
            if (direction === "R") { head.x++; }
            if (direction === "D") { head.y--; }
            if (direction === "L") { head.x--; }

            for (let i = 0; i < ropeLength - 1; i++) {
                const leader = positions[i];
                const follower = positions[i + 1];

                const { x, y } = computeFollowerMove(leader, follower);
                follower.x += x;
                follower.y += y;
            }

            const tail = positions[ropeLength - 1];
            visitedCellsSet.add(tail);
        }
    });

    return visitedCellsSet;
}

function computeFollowerMove(leader: Position, follower: Position) {
    const deltaX = leader.x - follower.x;
    const deltaY = leader.y - follower.y;

    if (Math.abs(deltaX) <= 1 && Math.abs(deltaY) <= 1) {
        return { x: 0, y: 0 };
    }

    return {
        x: Math.abs(deltaX) === 2 ? deltaX / 2 : deltaX,
        y: Math.abs(deltaY) === 2 ? deltaY / 2 : deltaY,
    };
}

function buildVisitedCellsSet() {
    const set = new Set<string>();

    return {
        add(position: Position) {
            set.add(JSON.stringify(position));
        },
        get size() {
            return set.size;
        }
    };
}
