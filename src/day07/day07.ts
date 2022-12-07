import { loadInput, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day07() {
    const input = loadInput("day07");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

export function part1(input: string) {
    const sizeByFolder = computeSizeByFolder(input);
    return _.sum(Object.values(sizeByFolder).filter(size => size <= 100000));
}

export function part2(input: string) {
    const sizeByFolder = computeSizeByFolder(input);

    const usedSpace = sizeByFolder["/"];
    const totalSpace = 70000000;
    const requiredUnusedSpace = 30000000;

    return _.min(Object.values(sizeByFolder).filter(size => usedSpace - size <= totalSpace - requiredUnusedSpace));
}


function buildPath(folders: string[]) {
    return folders.join("/");
}

function computeSizeByFolder(input: string) {
    const lines = splitLines(input);

    const subfoldersByFolder: Record<string, string[]> = {};
    const fileSizesByFolder: Record<string, number[]> = {};

    const navigationHistory: string[] = [];

    lines.forEach((line) => {
        if (line === "$ cd ..") {
            navigationHistory.pop();
            return;
        }
        if (line === "$ ls") { return; }

        if (line.startsWith("$ cd")) {
            const currentFolder = line.slice(5);
            navigationHistory.push(currentFolder);
            subfoldersByFolder[buildPath(navigationHistory)] = [];
            fileSizesByFolder[buildPath(navigationHistory)] = [];
            return;
        }

        if (line.startsWith("dir")) {
            subfoldersByFolder[buildPath(navigationHistory)].push(buildPath([...navigationHistory, line.slice(4)]));
        } else {
            const [size] = line.split(" ");
            fileSizesByFolder[buildPath(navigationHistory)].push(toInt(size));
        }
    });

    const sizeByFolder: Record<string, number> = {};

    computeSize("/");

    function computeSize(folder: string): number {
        if (sizeByFolder[folder]) { return sizeByFolder[folder]; }

        const size = _.sum(fileSizesByFolder[folder]) + _.sum(subfoldersByFolder[folder].map(computeSize));

        sizeByFolder[folder] = size;
        return size;
    }

    return sizeByFolder;
}
