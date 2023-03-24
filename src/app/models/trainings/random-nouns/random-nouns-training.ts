import { MongoIdUtils } from 'src/app/utils';
import { Training } from './../training';

export class RandomNounsTraining extends Training {
    constructor(
        id: string,
        name: string,
        tags: string[],
        public wordCount: number
    ) {
        super(id, name, tags);
    }

    clone(): RandomNounsTraining {
        return new RandomNounsTraining(
            this.id,
            this.name,
            [...this.tags],
            this.wordCount
        );
    }

    static empty(): RandomNounsTraining {
        return new RandomNounsTraining(MongoIdUtils.generateId(), '', [], 0);
    }
}
