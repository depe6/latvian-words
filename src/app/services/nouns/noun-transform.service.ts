import { Injectable } from '@angular/core';
import { NounDeclensionDto, NounDto } from 'src/app/dtos';
import { Noun, NounDeclension } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class NounTransformService {
    fromDto(dto: NounDto): Noun {
        return new Noun(
            dto._id,
            this.nounDeclensionFromDto(dto.singularLatvian),
            this.nounDeclensionFromDto(dto.pluralLatvian),
            this.nounDeclensionFromDto(dto.singularRussian),
            this.nounDeclensionFromDto(dto.pluralRussian),
            dto.tags || []
        );
    }

    toDto(noun: Noun): NounDto {
        return {
            _id: noun.id,
            singularLatvian: this.nounDeclensionToDto(noun.singularLatvian),
            pluralLatvian: this.nounDeclensionToDto(noun.pluralLatvian),
            singularRussian: this.nounDeclensionToDto(noun.singularRussian),
            pluralRussian: this.nounDeclensionToDto(noun.pluralRussian),
            tags: noun.tags || [],
        };
    }

    private nounDeclensionFromDto(dto: NounDeclensionDto): NounDeclension {
        return new NounDeclension(
            dto.nominativs,
            dto.genitivs,
            dto.dativs,
            dto.akuzativs,
            dto.instrumentalis,
            dto.lokativs,
            dto.vokativs
        );
    }

    private nounDeclensionToDto(
        nounDeclension: NounDeclension
    ): NounDeclensionDto {
        return {
            nominativs: nounDeclension.nominativs,
            genitivs: nounDeclension.genitivs,
            dativs: nounDeclension.dativs,
            akuzativs: nounDeclension.akuzativs,
            instrumentalis: nounDeclension.instrumentalis,
            lokativs: nounDeclension.lokativs,
            vokativs: nounDeclension.vokativs,
        };
    }
}
