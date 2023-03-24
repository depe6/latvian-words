import { Injectable } from '@angular/core';
import {
    RandomNounsTrainingDto,
    RandomVerbsTrainingDto,
    TrainingDto,
    TrainingTypes,
} from 'src/app/dtos';
import {
    RandomNounsTraining,
    RandomVerbsTraining,
    Training,
} from 'src/app/models';
import { VerbTransformService } from '../verbs/verb-transform.service';

@Injectable({ providedIn: 'root' })
export class TrainingTransformService {
    constructor(private verbTransformService: VerbTransformService) {}

    fromDto(dto: TrainingDto): RandomVerbsTraining | RandomNounsTraining {
        switch (dto.type) {
            case TrainingTypes.RandomVerbsTraining: {
                const randomVerbsTrainingDto = dto as RandomVerbsTrainingDto;

                return new RandomVerbsTraining(
                    randomVerbsTrainingDto._id,
                    randomVerbsTrainingDto.name,
                    randomVerbsTrainingDto.tags,
                    randomVerbsTrainingDto.wordCount,
                    (randomVerbsTrainingDto.verbTenses || []).map(
                        (verbTenseTypeDto) =>
                            this.verbTransformService.verbTenseTypeFromDto(
                                verbTenseTypeDto
                            )
                    )
                );
            }
            case TrainingTypes.RandoNounsTraining: {
                const randomNounsTrainingDto = dto as RandomNounsTrainingDto;

                return new RandomNounsTraining(
                    randomNounsTrainingDto._id,
                    randomNounsTrainingDto.name,
                    randomNounsTrainingDto.tags,
                    randomNounsTrainingDto.wordCount
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
        if (training instanceof RandomNounsTraining) {
            return {
                _id: training.id,
                type: TrainingTypes.RandoNounsTraining,
                name: training.name,
                tags: training.tags,
                wordCount: training.wordCount,
            } as RandomNounsTrainingDto;
        }
        throw new Error('Unsupported training model');
    }
}
