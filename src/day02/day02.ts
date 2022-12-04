import { loadInput, splitLines } from "../utils";
import _ from "lodash";

export function day02() {
    const input = loadInput("day02");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

type OpponentChoice = "A" | "B" | "C";
type MyChoice = "X" | "Y" | "Z";
type Target = "X" | "Y" | "Z";
type Outcome = "Win" | "Draw" | "Loss";

export function part1(input: string) {
    const strategyGuide = parseInput(input);
    return _.sum(strategyGuide.map(computeScore));

    function computeScore([opponentChoice, myChoice]: [OpponentChoice, MyChoice]) {
        return computeAbsoluteScore(myChoice) + computeMatchScore(opponentChoice, myChoice);
    }
}

export function part2(input: string) {
    const strategyGuide = parseInput(input);
    return _.sum(strategyGuide.map(computeScore));

    function computeScore([opponentChoice, target]: [OpponentChoice, Target]) {
        const myChoice = computeMyChoiceFromOpponentChoiceAndTarget(opponentChoice, target);
        return computeAbsoluteScore(myChoice) + computeMatchScore(opponentChoice, myChoice);
    }
    function computeMyChoiceFromOpponentChoiceAndTarget(opponentChoice: OpponentChoice, target: Target) {
        const choices: Record<OpponentChoice, Record<Target, MyChoice>> = {
            A: { X: "Z", Y: "X", Z: "Y" },
            B: { X: "X", Y: "Y", Z: "Z" },
            C: { X: "Y", Y: "Z", Z: "X" },
        };
        return choices[opponentChoice][target];
    }
}

function parseInput(input: string) {
    return splitLines(input).map(parseLine);
}
function parseLine(line: string) {
    return line.split(" ") as [OpponentChoice, MyChoice];
}

function computeMatchScore(opponentChoice: OpponentChoice, myChoice: MyChoice) {
    const outcomes: Record<OpponentChoice, Record<MyChoice, Outcome>> = {
        A: { X: "Draw", Y: "Win", Z: "Loss" },
        B: { X: "Loss", Y: "Draw", Z: "Win" },
        C: { X: "Win", Y: "Loss", Z: "Draw" },
    };
    const outcome = outcomes[opponentChoice][myChoice];
    return { Win: 6, Draw: 3, Loss: 0 }[outcome];
}
function computeAbsoluteScore(choice: MyChoice) {
    return { X: 1, Y: 2, Z: 3 }[choice];
}
