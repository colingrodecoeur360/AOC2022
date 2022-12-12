import { loadInput, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day12() {
    const input = loadInput("day12");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

export function part1(input: string) {
    const grid = new Grid(parseInput(input));

    const distances = grid.computeDistancesFrom("E");
    const [[i, j]] = grid.getNodesByValue("S");

    return distances[i][j];
}

export function part2(input: string) {
    const grid = new Grid(parseInput(input));

    const distances = grid.computeDistancesFrom("E");
    const nodesWithValueA = grid.getNodesByValue("a");

    return _.min(nodesWithValueA.map(([i, j]) => distances[i][j]));
}

function parseInput(input: string) {
    return splitLines(input).map(line => line.split(""));
}

type Node = [number, number];

function buildNodeSet() {
    const set = new Set<string>();

    return {
        add(node: Node) {
            set.add(nodeToKey(node));
        },
        has(node: Node) {
            return set.has(nodeToKey(node));
        },
        get size() {
            return set.size;
        },
        pop(): Node {
            const [item] = set;
            set.delete(item);
            return keyToNode(item);
        },
    };

    function nodeToKey(node: Node): string {
        const [i, j] = node;
        return `${i}-${j}`;
    }
    function keyToNode(key: string): Node {
        return key.split("-").map(toInt) as Node;
    }
}

class Grid {
    values: string[][];

    constructor(values: string[][]) {
        this.values = values;
    }

    get height() {
        return this.values.length;
    }

    get width() {
        return this.values[0].length;
    }

    computeElevations() {
        const elevations = Array(this.height).fill(0).map(() => Array(this.width).fill(0));
        const elevationByLetter: Record<string, number> = {
            S: 1,
            E: 26,
            ...Object.fromEntries("abcdefghijklmnopqrstuvwxyz".split("").map((letter, index) => [letter, index + 1]))
        };
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                elevations[i][j] = elevationByLetter[this.values[i][j]];
            }
        }
        return elevations;
    }

    getNodesByValue(value: string): Node[] {
        const nodes: Node[] = [];

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.values[i][j] === value) {
                    nodes.push([i, j]);
                }
            }
        }

        return nodes;
    }

    computeDistancesFrom(value: string) {
        const [sourceNode] = this.getNodesByValue(value);
        const [iSource, jSource] = sourceNode;

        const distances = Array(this.height).fill(0).map(() => Array(this.width).fill(Infinity));
        distances[iSource][jSource] = 0;

        const visited = buildNodeSet();
        const nodesToVisit = buildNodeSet();
        nodesToVisit.add(sourceNode);

        const elevations = this.computeElevations();

        while (nodesToVisit.size) {
            const node = nodesToVisit.pop();

            const [iNode, jNode] = node;
            visited.add(node);
            const neighbors = this.getNeighbors(node);

            neighbors.forEach((neighbor) => {
                const [iNeighbor, jNeighbor] = neighbor;

                if (elevations[iNeighbor][jNeighbor] - elevations[iNode][jNode] >= -1) {
                    distances[iNeighbor][jNeighbor] = Math.min(distances[iNeighbor][jNeighbor], distances[iNode][jNode] + 1);

                    if (! visited.has(neighbor) && ! nodesToVisit.has(neighbor)) {
                        nodesToVisit.add(neighbor);
                    }
                }
            });
        }

        return distances;
    }

    getNeighbors([i, j]: Node): Node[] {
        return [
            ...(i > 0 ? [buildNode(i - 1, j)] : []),
            ...(i < this.height - 1 ? [buildNode(i + 1, j)] : []),
            ...(j > 0 ? [buildNode(i, j - 1)] : []),
            ...(j < this.width - 1 ? [buildNode(i, j + 1)] : []),
        ];

        function buildNode(i: number, j: number): Node {
            return [i, j];
        }
    }
}
