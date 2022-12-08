import { Grid, loadInput, multiply, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day08() {
    const input = loadInput("day08");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

export function part1(input: string) {
    const grid = new Grid(parseInput(input));

    const nbOutsideTrees = 2 * grid.height + 2 * grid.width - 4;
    const nbInsideTrees = _.sum(grid.map(canSeeEdge, getInnerCellsRange(grid)));
    return nbOutsideTrees + nbInsideTrees;

    function canSeeEdge(i: number, j: number) {
        const slices = getAlignedCells(grid, i, j);

        return slices.some((slice) => {
            const tallerTreeDistance = slice.findIndex(value => value >= grid.cell(i, j));
            return tallerTreeDistance === -1;
        });
    }
}

export function part2(input: string) {
    const grid = new Grid(parseInput(input));

    return _.max(grid.map(computeScenicScore, getInnerCellsRange(grid)));

    function computeScenicScore(i: number, j: number) {
        const slices = getAlignedCells(grid, i, j);

        const scores = slices.map((slice) => {
            const tallerTreeDistance = slice.findIndex(value => value >= grid.cell(i, j));
            if (tallerTreeDistance === -1) { return slice.length; }
            return 1 + tallerTreeDistance;
        });

        return multiply(scores);
    }
}


function parseInput(input: string) {
    return splitLines(input).map(row => row.split("").map(toInt));
}

function getAlignedCells<T>(grid: Grid<T>, i: number, j: number) {
    return [
        grid.row(i).slice(0, j).reverse(),
        grid.row(i).slice(j + 1, grid.width),
        grid.column(j).slice(0, i).reverse(),
        grid.column(j).slice(i + 1, grid.height),
    ];
}
function getInnerCellsRange(grid: Grid<unknown>) {
    return { iStart: 1, iEnd: grid.height - 2, jStart: 1, jEnd: grid.width - 2 };
}
