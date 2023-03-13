export class VerbTense {
    constructor(
        public firstPersonSingular: string,
        public secondPersonSingular: string,
        public thirdPersonSingular: string,
        public firstPersonPlural: string,
        public secondPersonPlural: string,
        public thirdPersonPlural: string
    ) {}

    clone(): VerbTense {
        return new VerbTense(
            this.firstPersonSingular,
            this.secondPersonSingular,
            this.thirdPersonSingular,
            this.firstPersonPlural,
            this.secondPersonPlural,
            this.thirdPersonPlural
        );
    }

    static empty(): VerbTense {
        return new VerbTense('', '', '', '', '', '');
    }
}
