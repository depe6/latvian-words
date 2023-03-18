import { MongoIdUtils } from 'src/app/utils';
import { NounDeclension } from './noun-declension';

export class Noun {
    constructor(
        public id: string,
        public singularLatvian: NounDeclension,
        public pluralLatvian: NounDeclension,
        public singularRussian: NounDeclension,
        public pluralRussian: NounDeclension,
        public tags: string[]
    ) {}

    get latvian(): string {
        return this.singularLatvian?.nominativs || '';
    }

    get russian(): string {
        return this.singularRussian?.nominativs || '';
    }

    clone(): Noun {
        return new Noun(
            this.id,
            this.singularLatvian,
            this.pluralLatvian,
            this.singularRussian,
            this.pluralRussian,
            [...this.tags]
        );
    }

    static empty(): Noun {
        return new Noun(
            MongoIdUtils.generateId(),
            NounDeclension.empty(),
            NounDeclension.empty(),
            NounDeclension.empty(),
            NounDeclension.empty(),
            []
        );
    }
}
