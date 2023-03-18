import { Injectable } from '@angular/core';
import { NounDto } from 'src/app/dtos';
import { MongoServiceBase } from '../mongo/mongo.service';
import { MongoConnectionService } from '../mongo/mongo-connection.service';
import { NounTransformService } from './noun-transform.service';
import { Noun } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class NounService extends MongoServiceBase<NounDto> {
    constructor(
        private nounTransformService: NounTransformService,
        mongoConnectionService: MongoConnectionService
    ) {
        super(mongoConnectionService);
    }

    async loadAllNouns(): Promise<Noun[]> {
        const nounDtos = await this.find();
        const nouns = (nounDtos || []).map((dto) =>
            this.nounTransformService.fromDto(dto)
        );
        return nouns;
    }

    async addNoun(noun: Noun): Promise<string> {
        const nounDto = this.nounTransformService.toDto(noun);
        return await this.insertOne(nounDto);
    }

    async updateNoun(noun: Noun): Promise<void> {
        const nounDto = this.nounTransformService.toDto(noun);
        await this.updateOne(nounDto);
    }

    async deleteNoun(id: string): Promise<void> {
        await this.deleteOne(id);
    }

    protected getCollectionName(): string {
        return 'nouns';
    }
}
