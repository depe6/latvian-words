export class NumberUtils {
    static max(...numbers: number[]): number {
        return Math.max(...numbers);
    }

    static min(...numbers: number[]): number {
        return Math.min(...numbers);
    }

    static randomIntFromInterval(minIncluded: number, maxIncluded: number) {
        return Math.floor(
            Math.random() * (maxIncluded - minIncluded + 1) + minIncluded
        );
    }
}
