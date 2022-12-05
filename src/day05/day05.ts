import { loadInput, toInt } from "../utils";
import _ from "lodash";

export function day05() {
    const input = loadInput("day05");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

type Crate = string;
type Stack = Crate[];
type Instruction = {
    n: number;
    from: number;
    to: number;
};

export function part1(input: string) {
    const { stacks, instructions } = parseInput(input);

    instructions.forEach(({ n, from, to }) => {
        for (let i = 0; i < n; i++) {
            const crate = stacks[from].shift()!;
            stacks[to].unshift(crate);
        }
    });

    return getTopCrates(stacks);
}

export function part2(input: string) {
    const { stacks, instructions } = parseInput(input);

    instructions.forEach(({ n, from, to }) => {
        const cratesToMove: Crate[] = [];
        for (let i = 0; i < n; i++) {
            const crate = stacks[from].shift()!;
            cratesToMove.push(crate);
        }
        cratesToMove.reverse().forEach((crate) => {
            stacks[to].unshift(crate);
        });
    });

    return getTopCrates(stacks);
}

function parseInput(input: string) {
    const lines = input.split("\n");

    const stacks: Stack[] = [];
    const instructions: Instruction[] = [];

    const indexOfLineBreak = lines.indexOf("");
    const nbStacks = toInt(_.last(lines[indexOfLineBreak - 1].trim().split(""))!);

    for (let i = 0; i < nbStacks; i++) {
        const stack: Stack = [];
        for (let j = 0; j < indexOfLineBreak - 1; j++) {
            const crate = lines[j][i * 4 + 1] ?? " ";
            if (crate !== " ") { stack.push(crate); }
        }
        stacks.push(stack);
    }

    for (let i = indexOfLineBreak + 1; i < lines.length; i++) {
        const [, n, from, to] = lines[i].split(/\D+/).map(toInt);
        instructions.push({ n, from: from - 1, to: to - 1 });
    }

    return { stacks, instructions };
}
function getTopCrates(stacks: Stack[]) {
    return stacks.map(stack => stack[0]).join("");
}
