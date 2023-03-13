import { Injectable } from '@angular/core';
import { TrainingDto } from 'src/app/dtos';
import { Training } from 'src/app/models';
import { MongoServiceBase } from '../mongo/mongo.service';
import { MongoConnectionService } from '../mongo/mongo-connection.service';
import { TrainingTransformService } from './training-transform.service';

@Injectable({ providedIn: 'root' })
export class TrainingService extends MongoServiceBase<TrainingDto> {
    constructor(
        private trainingTransformService: TrainingTransformService,
        mongoConnectionService: MongoConnectionService
    ) {
        super(mongoConnectionService);
    }

    async loadAllTrainings(): Promise<Training[]> {
        const trainingDtos = await this.find();
        const trainings = (trainingDtos || []).map((dto) =>
            this.trainingTransformService.fromDto(dto)
        );
        return trainings;
    }

    async addTraining(training: Training): Promise<string> {
        const trainingDto = this.trainingTransformService.toDto(training);
        return await this.insertOne(trainingDto);
    }

    async updateTraining(training: Training): Promise<void> {
        const trainingDto = this.trainingTransformService.toDto(training);
        await this.updateOne(trainingDto);
    }

    async deleteTraining(id: string): Promise<void> {
        await this.deleteOne(id);
    }

    protected getCollectionName(): string {
        return 'trainings';
    }
}
