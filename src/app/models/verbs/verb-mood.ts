import { VerbTense } from './verb-tense';

export class VerbMood {
    constructor(
        public pastLatvian: VerbTense,
        public presentLatvian: VerbTense,
        public futureLatvian: VerbTense,
        public pastRussian: VerbTense,
        public presentRussian: VerbTense,
        public futureRussian: VerbTense
    ) {}

    clone(): VerbMood {
        return new VerbMood(
            this.pastLatvian.clone(),
            this.presentLatvian.clone(),
            this.futureLatvian.clone(),
            this.pastRussian.clone(),
            this.presentRussian.clone(),
            this.futureRussian.clone()
        );
    }

    static empty(): VerbMood {
        return new VerbMood(
            VerbTense.empty(),
            VerbTense.empty(),
            VerbTense.empty(),
            VerbTense.empty(),
            VerbTense.empty(),
            VerbTense.empty()
        );
    }
}
