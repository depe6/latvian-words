import { MongoIdUtils } from 'src/app/utils';
import { VerbTenseType } from '../../verbs/verb-tense-type';
import { Training } from './../training';

export class RandomVerbsTraining extends Training {
    constructor(
        id: string,
        name: string,
        tags: string[],
        public wordCount: number,
        public verbTenses: VerbTenseType[]
    ) {
        super(id, name, tags);
    }

    clone(): RandomVerbsTraining {
        return new RandomVerbsTraining(
            this.id,
            this.name,
            [...this.tags],
            this.wordCount,
            this.verbTenses
        );
    }

    static empty(): RandomVerbsTraining {
        return new RandomVerbsTraining(
            MongoIdUtils.generateId(),
            '',
            [],
            0,
            []
        );
    }
}
