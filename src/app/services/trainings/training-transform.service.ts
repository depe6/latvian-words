import { Injectable } from '@angular/core';
import {
    RandomVerbsTrainingDto,
    TrainingDto,
    TrainingTypes,
} from 'src/app/dtos';
import { RandomVerbsTraining, Training } from 'src/app/models';
import { VerbTransformService } from '../verbs/verb-transform.service';

@Injectable({ providedIn: 'root' })
export class TrainingTransformService {
    constructor(private verbTransformService: VerbTransformService) {}

    fromDto(dto: TrainingDto): RandomVerbsTraining {
        switch (dto.type) {
            case TrainingTypes.RandomVerbsTraining: {
                const verTrainingDto = dto as RandomVerbsTrainingDto;

                return new RandomVerbsTraining(
                    verTrainingDto._id,
                    verTrainingDto.name,
                    verTrainingDto.tags,
                    verTrainingDto.wordCount,
                    (verTrainingDto.verbTenses || []).map((verbTenseTypeDto) =>
                        this.verbTransformService.verbTenseTypeFromDto(
                            verbTenseTypeDto
                        )
                    )
                );
            }
            default:
                throw new Error(`Unsupported training type in dto ${dto.type}`);
        }
    }

    toDto(training: Training): TrainingDto {
        if (training instanceof RandomVerbsTraining) {
            return {
                _id: training.id,
                type: TrainingTypes.RandomVerbsTraining,
                name: training.name,
                tags: training.tags,
                wordCount: training.wordCount,
                verbTenses: (training.verbTenses || []).map((verbTenseType) =>
                    this.verbTransformService.verbTenseTypeToDto(verbTenseType)
                ),
            } as RandomVerbsTrainingDto;
        }
        throw new Error('Unsupported training model');
    }
}
