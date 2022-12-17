import {loadInput, splitLines, toInt} from "../utils";
import _ from "lodash";

export function day14() {
    const input = loadInput("day14");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

type Point = [number, number];
type Path = Point[];

export function part1(input: string) {
    const rawPaths = parseInput(input);
    const { iMax, jMin, jMax } = computeBounds(rawPaths);

    const paths = rawPaths.map((path): Path => path.map(([i, j]) => [i, j - jMin + 1]));

    const grid = Array(iMax + 1).fill(0).map(() => Array(jMax - jMin + 2).fill("."));

    drawWalls(grid, paths);
    const [iSource, jSource] = [0, 500 - jMin + 1];
    grid[iSource][jSource] = "+";

    while (true) {
        const [iDest, jDest] = getNextDestinationCell(grid, [iSource, jSource], iMax);
        if (iDest === iSource && jDest === jSource) { break; }
        if (iDest === iMax) { break; }
        grid[iDest][jDest] = "o";
    }

    return countGrainsOfSand(grid);
}

export function part2(input: string) {
    const rawPaths = parseInput(input);
    const { iMax, jMin, jMax } = computeBounds(rawPaths);

    const width = jMax - jMin;
    const height = iMax + 2;
    const paths = rawPaths.map((path): Path => path.map(([i, j]) => [i, j - jMin + height]));
    const grid = Array(height + 1).fill(0).map(() => Array(width + 2 * height).fill("."));

    const [iSource, jSource] = [0, 500 - jMin + height];
    grid[iSource][jSource] = "+";
    drawWalls(grid, paths);
    for (let j = 0; j < width + 2 * height; j++) {
        grid[height][j] = "#";
    }

    while (true) {
        const [iDest, jDest] = getNextDestinationCell(grid, [iSource, jSource], iMax + 2);
        if (iDest === iSource && jDest === jSource) { break; }
        grid[iDest][jDest] = "o";
    }

    return countGrainsOfSand(grid) + 1;
}

function parseInput(input: string): Path[] {
    return splitLines(input).map(getPoints);

    function getPoints(line: string) {
        const rawPoints = line.split(" -> ");
        return rawPoints.map(point => point.split(",").map(toInt).reverse() as Point);
    }
}

function computeBounds(paths: Path[]) {
    return {
        iMin: _.min(paths.map(path => _.min(path.map(point => point[0]))))!,
        iMax: _.max(paths.map(path => _.max(path.map(point => point[0]))))!,
        jMin: _.min(paths.map(path => _.min(path.map(point => point[1]))))!,
        jMax: _.max(paths.map(path => _.max(path.map(point => point[1]))))!,
    }
}

function drawWalls(grid: string[][], paths: Path[]) {
    paths.forEach((path) => {
        for (let pointIndex = 0; pointIndex < path.length - 1; pointIndex++) {
            const [i1, j1] = path[pointIndex];
            const [i2, j2] = path[pointIndex + 1];

            if (i1 === i2) {
                for (let j = Math.min(j1, j2); j <= Math.max(j1, j2); j++) {
                    grid[i1][j] = "#";
                }
            }
            if (j1 === j2) {
                for (let i = Math.min(i1, i2); i <= Math.max(i1, i2); i++) {
                    grid[i][j1] = "#";
                }
            }
        }
    });
}

function countGrainsOfSand(grid: string[][]) {
    return grid.flat().filter(cell => cell === "o").length;
}

function getNextDestinationCell(grid: string[][], source: Point, iMax: number) {
    let [i, j] = source;

    while (grid[i + 1].slice(j - 1, j + 2).includes(".")) {
        if (grid[i + 1][j] === ".") { i++; }
        else if (grid[i + 1][j - 1] === ".") { i++; j--; }
        else if (grid[i + 1][j + 1] === ".") { i++; j++; }

        if (i >= iMax) { break; }
    }

    return [i, j];
}
