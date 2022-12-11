import { loadInput, multiply, sortNumbersDescending, toInt } from "../utils";
export function day11() {
    const input = loadInput("day11");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

export function part1(input: string) {
    const monkeys = parseInput(input);

    const inspectionCountByMonkey = monkeys.map(() => 0);

    for (let i = 0; i < 20; i++) {
        for (const [index, monkey] of monkeys.entries()) {
            for (const item of monkey.items) {
                const worryLevel = Math.floor(computeWorryLevel(monkey, item) / 3);
                if (worryLevel % monkey.divisibilityCondition) {
                    monkeys[monkey.recipientIfFalse].items.push(worryLevel);
                } else {
                    monkeys[monkey.recipientIfTrue].items.push(worryLevel);
                }
                inspectionCountByMonkey[index]++;
            }
            monkey.items = [];
        }
    }

    return computeMonkeyBusiness(inspectionCountByMonkey);
}

export function part2(input: string) {
    const monkeys = parseInput(input);

    const inspectionCountByMonkey = monkeys.map(() => 0);

    const modulo = multiply(monkeys.map(monkey => monkey.divisibilityCondition));

    for (let i = 0; i < 10000; i++) {
        for (const [index, monkey] of monkeys.entries()) {
            for (const item of monkey.items) {
                const worryLevel = computeWorryLevel(monkey, item) % modulo;

                if (worryLevel % monkey.divisibilityCondition) {
                    monkeys[monkey.recipientIfFalse].items.push(worryLevel);
                } else {
                    monkeys[monkey.recipientIfTrue].items.push(worryLevel);
                }
                inspectionCountByMonkey[index]++;
            }
            monkey.items = [];
        }
    }

    return computeMonkeyBusiness(inspectionCountByMonkey);
}


type Monkey = {
    items: number[];
    operation: { type: "+"; value: number; } | { type: "*"; value: number | "old" };
    divisibilityCondition: number;
    recipientIfTrue: number;
    recipientIfFalse: number;
};

function parseInput(input: string): Monkey[] {
    const lines = input.split("\n").map(line => line.trim());

    const nbMonkeys = lines.length / 7;
    const monkeys: Monkey[] = [];

    for (let i = 0; i < nbMonkeys; i++) {
        const items = lines[i * 7 + 1].replace("Starting items: ", "").split(", ");
        const [, type, value] = /Operation: new = old ([+*]) (\d*)/.exec(lines[i * 7 + 2])!;
        const [, divisibleBy] = /Test: divisible by (\d*)/.exec(lines[i * 7 + 3])!;
        const [, recipientIfTrue] = /If true: throw to monkey (\d*)/.exec(lines[i * 7 + 4])!;
        const [, recipientIfFalse] = /If false: throw to monkey (\d*)/.exec(lines[i * 7 + 5])!;

        monkeys.push({
            items: items.map(toInt),
            operation: { type, value: value ? toInt(value) : "old" } as Monkey["operation"],
            divisibilityCondition: toInt(divisibleBy),
            recipientIfTrue: toInt(recipientIfTrue),
            recipientIfFalse: toInt(recipientIfFalse),
        });
    }

    return monkeys;
}

function computeWorryLevel(monkey: Monkey, currentWorryLevel: number) {
    if (monkey.operation.type === "+") {
        return currentWorryLevel + monkey.operation.value;
    }
    if (monkey.operation.value === "old") {
        return currentWorryLevel ** 2;
    }
    return currentWorryLevel * monkey.operation.value;
}

function computeMonkeyBusiness(inspectionCountByMonkey: number[]) {
    return multiply(sortNumbersDescending(inspectionCountByMonkey).slice(0, 2));
}
