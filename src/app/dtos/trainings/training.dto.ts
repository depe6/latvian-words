import { DocumentDto } from '../base/document.dto';

export interface TrainingDto extends DocumentDto {
    name: string;
    type: string;
    tags: string[];
}
