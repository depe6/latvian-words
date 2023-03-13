import { TrainingDto } from '../training.dto';

export interface RandomVerbsTrainingDto extends TrainingDto {
    wordCount: number;
    verbTenses: string[];
}
