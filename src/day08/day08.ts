import { loadInput, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day08() {
    const input = loadInput("day08");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

export function part1(input: string) {
    const grid = parseInput(input);

    const height = grid.length;
    const width = grid[0].length;

    const nbOutsideTrees = 2 * height + 2 * width - 4;

    const visibleTrees = Array(height).fill(0).map(() => Array<number>(width).fill(0));

    for (let i = 1; i < height - 1; i++) {
        let max = grid[i][0];
        for (let j = 1; j < width - 1; j++) {
            if (grid[i][j] > max) {
                visibleTrees[i][j] = 1;
                max = grid[i][j];
            }
        }
    }
    for (let i = 1; i < height - 1; i++) {
        let max = grid[i][width - 1];
        for (let j = width - 2; j > 0; j--) {
            if (grid[i][j] > max) {
                visibleTrees[i][j] = 1;
                max = grid[i][j];
            }
        }
    }
    for (let j = 1; j < width - 1; j++) {
        let max = grid[0][j];
        for (let i = 1; i < height - 1; i++) {
            if (grid[i][j] > max) {
                visibleTrees[i][j] = 1;
                max = grid[i][j];
            }
        }
    }
    for (let j = 1; j < width - 1; j++) {
        let max = grid[width - 1][j];
        for (let i = height - 2; i > 0; i--) {
            if (grid[i][j] > max) {
                visibleTrees[i][j] = 1;
                max = grid[i][j];
            }
        }
    }

    return _.sum(visibleTrees.flat()) + nbOutsideTrees;
}

export function part2(input: string) {
    const grid = parseInput(input);

    const height = grid.length;
    const width = grid[0].length;

    const scenicScores = Array(height).fill(0).map(() => Array<number>(width).fill(0));

    for (let i = 1; i < height - 1; i++) {
        for (let j = 1; j < width - 1; j++) {
            let leftScore = 0;
            for (let k = i - 1; k >= 0; k--) {
                leftScore++;
                if (grid[k][j] >= grid[i][j]) { break; }
            }
            let rightScore = 0;
            for (let k = i + 1; k < height; k++) {
                rightScore++;
                if (grid[k][j] >= grid[i][j]) { break; }
            }
            let upScore = 0;
            for (let k = j - 1; k >= 0; k--) {
                upScore++;
                if (grid[i][k] >= grid[i][j]) { break; }
            }
            let downScore = 0;
            for (let k = j + 1; k < width; k++) {
                downScore++;
                if (grid[i][k] >= grid[i][j]) { break; }
            }
            scenicScores[i][j] = leftScore * rightScore * upScore * downScore;
        }
    }

    return _.max(scenicScores.flat());
}

function parseInput(input: string) {
    return splitLines(input).map(row => row.split("").map(toInt));
}
