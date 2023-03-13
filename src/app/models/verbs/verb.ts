import { MongoIdUtils } from 'src/app/utils';
import { VerbMood } from './verb-mood';

export class Verb {
    constructor(
        public id: string,
        public latvianInfinitive: string,
        public russianInfinitive: string,
        public indicative: VerbMood,
        public tags: string[]
    ) {}

    clone(): Verb {
        return new Verb(
            this.id,
            this.latvianInfinitive,
            this.russianInfinitive,
            this.indicative.clone(),
            [...this.tags]
        );
    }

    static empty(): Verb {
        return new Verb(
            MongoIdUtils.generateId(),
            '',
            '',
            VerbMood.empty(),
            []
        );
    }
}
