import { Noun } from './noun';

export interface NounDialogData {
    noun: Noun;
    allNouns: readonly Noun[];
    addingNewNoun: boolean;
}
