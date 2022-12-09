import _ from "lodash";
import { day01 } from "./day01";
import { day02 } from "./day02";
import { day03 } from "./day03";
import { day04 } from "./day04";
import { day05 } from "./day05";
import { day06 } from "./day06";
import { day07 } from "./day07";
import { day08 } from "./day08";
import { day09 } from "./day09";
import { solutions as expectedSolutions } from "./solutions";

interface Solution {
    part1?: Function;
    part2?: Function;
}

const solutionByDay: Record<string, Solution> = {
    1: day01(),
    2: day02(),
    3: day03(),
    4: day04(),
    5: day05(),
    6: day06(),
    7: day07(),
    8: day08(),
    9: day09(),
};

const day = process.argv[2];

if (day === "all") {
    displaySolutions(solutionByDay);
} else if (! day) {
    displaySolutions(Object.fromEntries([_.last(Object.entries(solutionByDay))!]))
} else {
    displaySolutions(Object.fromEntries([[day, solutionByDay[day]]]))
}

function displaySolutions(solutions: Record<string, Solution>) {
    Object.entries(solutions).forEach(([day, solution]) => {
        if (solution.part1) { displaySolution(day, "part1"); }
        if (solution.part2) { displaySolution(day, "part2"); }
    });

    function displaySolution(day: string, part: "part1" | "part2") {
        if (! solutions[day] || ! solutions[day][part]) { return; }
        const solution = solutions[day][part]!();
        const output = `Day ${day} - ${part}: ${solution}`;
        const expectedSolution = expectedSolutions[day] && expectedSolutions[day][part];
        if (expectedSolution) {
            if (solution === expectedSolution) {
                console.log(`🟢 ${output}`);
            } else {
                console.log(`🔴 ${output} — Expected ${expectedSolution}`);
            }
        } else {
            console.log(`${output}`);
        }
    }
}
