export class FilterUtils {
    static filterByContent(obj: any, filter: string): boolean {
        if ((filter || '').length === 0) {
            return true;
        }

        const verbString = this.toPropString(obj);
        const verbNormalized = verbString
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '');

        return verbNormalized.toLowerCase().includes(filter.toLowerCase());
    }

    private static toPropString(obj: any): string {
        if (obj === null || obj === undefined) {
            return '';
        }

        if (typeof obj === 'object') {
            const propValues: string[] = [];
            for (const prop in obj) {
                if (prop?.toLowerCase() === 'id') {
                    continue;
                }
                propValues.push(this.toPropString(obj[prop]));
            }
            return propValues.join('');
        }

        return obj.toString();
    }
}
