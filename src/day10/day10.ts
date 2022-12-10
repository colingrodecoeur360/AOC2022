import { loadInput, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day10() {
    const input = loadInput("day10");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

export function part1(input: string) {
    const instructions = parseInput(input);

    const registerValueByCycle = computeRegisterValueByCycle(instructions);

    const interestingCycles = [20, 60, 100, 140, 180, 220];

    return _.sum(interestingCycles.map(i => i * registerValueByCycle[i - 1]));
}

export function part2(input: string) {
    const instructions = parseInput(input);

    const registerValueByCycle = computeRegisterValueByCycle(instructions);

    const height = 6;
    const width = 40;
    const pixels = Array(height).fill(0).map(() => Array<string>(width).fill("."));

    registerValueByCycle.forEach((position, cycle) => {
        const i = Math.floor(cycle / width);
        const j = cycle % width;

        if (Math.abs(position - j) <= 1) {
            pixels[i][j] = "#";
        }
    })

    return pixels.map(row => row.join("")).join("\n");
}

type Instruction = { type: "noop" } | { type: "addx", value: number };

function parseInput(input: string): Instruction[] {
    return splitLines(input).map((row) => {
        if (row === "noop") {
            return { type: "noop" };
        }

        const [, value] = row.split(" ");
        return { type: "addx", value: toInt(value) };
    });
}

function computeRegisterValueByCycle(instructions: Instruction[]) {
    let registerX = 1;
    const registerValueByCycle: number[] = [1];

    instructions.forEach((instruction) => {
        if (instruction.type === "noop") {
            registerValueByCycle.push(registerX);
        } else {
            registerValueByCycle.push(registerX);
            registerX += instruction.value;
            registerValueByCycle.push(registerX);
        }
    });

    return registerValueByCycle;
}
