import { Injectable } from '@angular/core';
import { VerbDto } from 'src/app/dtos';
import { Verb } from 'src/app/models';
import { MongoServiceBase } from '../mongo/mongo.service';
import { VerbTransformService } from './verb-transform.service';
import { MongoConnectionService } from '../mongo/mongo-connection.service';

@Injectable({ providedIn: 'root' })
export class VerbService extends MongoServiceBase<VerbDto> {
    constructor(
        private verbTransformService: VerbTransformService,
        mongoConnectionService: MongoConnectionService
    ) {
        super(mongoConnectionService);
    }

    async loadAllVerbs(): Promise<Verb[]> {
        const verbDtos = await this.find();
        const verbs = (verbDtos || []).map((dto) =>
            this.verbTransformService.fromDto(dto)
        );
        return verbs;
    }

    async addVerb(verb: Verb): Promise<string> {
        const verbDto = this.verbTransformService.toDto(verb);
        return await this.insertOne(verbDto);
    }

    async updateVerb(verb: Verb): Promise<void> {
        const verbDto = this.verbTransformService.toDto(verb);
        await this.updateOne(verbDto);
    }

    async deleteVerb(id: string): Promise<void> {
        await this.deleteOne(id);
    }

    protected getCollectionName(): string {
        return 'verbs';
    }
}
