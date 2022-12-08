export class Grid<T> {
    values: T[][];

    constructor(values: T[][]) {
        this.values = values;
    }

    get height() {
        return this.values.length;
    }

    get width() {
        return this.values[0].length;
    }

    row(i: number) {
        if (i < 0 || i > this.height) { throw new Error(`Row out of bounds: ${i}`); }
        return this.values[i];
    }

    column(j: number) {
        if (j < 0 || j > this.width) { throw new Error(`Column out of bounds: ${j}`); }
        return this.values.map(row => row[j]);
    }

    cell(i: number, j: number) {
        return this.values[i][j];
    }

    map<V>(
        f: (i: number, j: number) => V,
        { iStart = 0, iEnd = this.height - 1, jStart = 0, jEnd = this.width - 1 } = {}
    ) {
        const result: V[] = [];
        for (let i = iStart; i <= iEnd; i++) {
            for (let j = jStart; j <= jEnd; j++) {
                result.push(f(i, j));
            }
        }
        return result;
    }
}
