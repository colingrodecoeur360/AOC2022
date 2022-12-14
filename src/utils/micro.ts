export function toInt(n: string) {
    return parseInt(n);
}

export function binaryNumbersToInt(n: number[]) {
    return parseInt(n.join(""), 2);
}

export function isNDigitNumber(value: string, n: number) {
    const regex = new RegExp(`^[0-9]{${n}}$`);
    return !! value.match(regex);
}

export function isBetween(value: string, min: number, max: number) {
    return min <= toInt(value) && toInt(value) <= max;
}

export function multiply(numbers: number[]) {
    let result = 1;
    numbers.forEach(number => result *= number);
    return result;
}

export function median(numbers: number[]) {
    const sortedNumbers = [...numbers].sort((a, b) => b - a);
    const n = numbers.length;
    if (n % 2 === 0) {
        return (sortedNumbers[n / 2] + sortedNumbers[(n / 2) - 1]) / 2;
    } else {
        return sortedNumbers[Math.floor(n / 2)];
    }
}

export function sortNumbersAscending(numbers: number[]) {
    return [...numbers].sort((a, b) => a - b);
}

export function sortNumbersDescending(numbers: number[]) {
    return [...numbers].sort((a, b) => b - a);
}
