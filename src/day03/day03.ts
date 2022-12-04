import { loadInput, splitLines } from "../utils";
import _ from "lodash";

export function day03() {
    const input = loadInput("day03");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

type Rucksack = string;
type Group = [Rucksack, Rucksack, Rucksack];

export function part1(input: string) {
    const rucksacks = parseInput(input);
    const priorities = rucksacks.map(computeCommonItem).map(computePriority);
    return _.sum(priorities);

    function computeCommonItem(rucksack: Rucksack) {
        const l = rucksack.trim().length;
        const compartment1 = rucksack.slice(0, l / 2).split("")
        const compartment2 = rucksack.slice(l / 2, l).split("")
        return  _.intersection(compartment1, compartment2)[0];
    }
}

export function part2(input: string) {
    const rucksacks = parseInput(input);

    const groups = computeGroups(rucksacks);
    return _.sum(groups.map(computeGroupPriority));

    function computeGroupPriority(group: Group) {
        const commonItem = _.intersection(...group.map(rucksack => rucksack.split("")))[0];
        return computePriority(commonItem);
    }
}

function parseInput(input: string) {
    return splitLines(input);
}

function computePriority(item: string) {
    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(item) + 1;
}


function computeGroups(rucksacks: Rucksack[]) {
    const nbGroups = rucksacks.length / 3;
    const groups: Group[] = [];

    for (let groupIndex = 0; groupIndex < nbGroups; groupIndex++) {
        groups.push([
            rucksacks[3 * groupIndex],
            rucksacks[3 * groupIndex + 1],
            rucksacks[3 * groupIndex + 2],
        ]);
    }

    return groups;
}
