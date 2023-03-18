export class NounDeclension {
    constructor(
        public nominativs: string,
        public genitivs: string,
        public dativs: string,
        public akuzativs: string,
        public instrumentalis: string,
        public lokativs: string,
        public vokativs: string
    ) {}

    clone(): NounDeclension {
        return new NounDeclension(
            this.nominativs,
            this.genitivs,
            this.dativs,
            this.akuzativs,
            this.instrumentalis,
            this.lokativs,
            this.vokativs
        );
    }

    static empty(): NounDeclension {
        return new NounDeclension('', '', '', '', '', '', '');
    }
}
