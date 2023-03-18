import { DocumentDto } from '../base/document.dto';
import { NounDeclensionDto } from './noun-declension.dto';

export interface NounDto extends DocumentDto {
    singularLatvian: NounDeclensionDto;
    pluralLatvian: NounDeclensionDto;
    singularRussian: NounDeclensionDto;
    pluralRussian: NounDeclensionDto;
    tags: string[];
}
