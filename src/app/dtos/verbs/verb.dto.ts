import { DocumentDto } from '../base/document.dto';
import { VerbMoodDto } from './verb-mood.dto';

export interface VerbDto extends DocumentDto {
    latvianInfinitive: string;
    russianInfinitive: string;
    indicative: VerbMoodDto;
    tags: string[];
}
