import { Injectable } from '@angular/core';
import { VerbDto, VerbMoodDto, VerbTenseDto } from 'src/app/dtos';
import { Verb, VerbMood, VerbTense, VerbTenseType } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class VerbTransformService {
    fromDto(dto: VerbDto): Verb {
        return new Verb(
            dto._id,
            dto.latvianInfinitive,
            dto.russianInfinitive,
            this.verbMoodFromDto(dto.indicative),
            dto.tags || []
        );
    }

    toDto(verb: Verb): VerbDto {
        return {
            _id: verb.id,
            latvianInfinitive: verb.latvianInfinitive,
            russianInfinitive: verb.russianInfinitive,
            indicative: this.verbMoodToDto(verb.indicative),
            tags: verb.tags || [],
        };
    }

    verbTenseTypeToDto(tenseType: VerbTenseType): string {
        switch (tenseType) {
            case VerbTenseType.Past:
                return 'Past';
            case VerbTenseType.Present:
                return 'Present';
            case VerbTenseType.Future:
                return 'Future';
        }

        throw new Error(`Not supported verb tense type ${tenseType}`);
    }

    verbTenseTypeFromDto(tenseTypeDto: string): VerbTenseType {
        switch (tenseTypeDto) {
            case 'Past':
                return VerbTenseType.Past;
            case 'Present':
                return VerbTenseType.Present;
            case 'Future':
                return VerbTenseType.Future;
        }

        throw new Error(`Not supported verb tense type dto ${tenseTypeDto}`);
    }

    private verbMoodFromDto(dto: VerbMoodDto): VerbMood {
        return new VerbMood(
            this.verbTenseFromDto(dto.pastLatvian),
            this.verbTenseFromDto(dto.presentLatvian),
            this.verbTenseFromDto(dto.futureLatvian),
            this.verbTenseFromDto(dto.pastRussian),
            this.verbTenseFromDto(dto.presentRussian),
            this.verbTenseFromDto(dto.futureRussian)
        );
    }

    private verbMoodToDto(verbMood: VerbMood): VerbMoodDto {
        return {
            pastLatvian: this.verbTenseToDto(verbMood.pastLatvian),
            presentLatvian: this.verbTenseToDto(verbMood.presentLatvian),
            futureLatvian: this.verbTenseToDto(verbMood.futureLatvian),
            pastRussian: this.verbTenseToDto(verbMood.pastRussian),
            presentRussian: this.verbTenseToDto(verbMood.presentRussian),
            futureRussian: this.verbTenseToDto(verbMood.futureRussian),
        };
    }

    private verbTenseFromDto(dto: VerbTenseDto): VerbTense {
        return new VerbTense(
            dto.firstPersonSingular,
            dto.secondPersonSingular,
            dto.thirdPersonSingular,
            dto.firstPersonPlural,
            dto.secondPersonPlural,
            dto.thirdPersonPlural
        );
    }

    private verbTenseToDto(verbTense: VerbTense): VerbTenseDto {
        return {
            firstPersonSingular: verbTense.firstPersonSingular,
            secondPersonSingular: verbTense.secondPersonSingular,
            thirdPersonSingular: verbTense.thirdPersonSingular,
            firstPersonPlural: verbTense.firstPersonPlural,
            secondPersonPlural: verbTense.secondPersonPlural,
            thirdPersonPlural: verbTense.thirdPersonPlural,
        };
    }
}
