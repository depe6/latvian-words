import { Verb } from './verb';

export interface VerbDialogData {
    verb: Verb;
    allVerbs: readonly Verb[];
    addingNewVerb: boolean;
}
