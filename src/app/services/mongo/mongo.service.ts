import { DocumentDto } from 'src/app/dtos';
import { MongoConnectionService } from './mongo-connection.service';

export abstract class MongoServiceBase<TDocument extends DocumentDto> {
    private collection: globalThis.Realm.Services.MongoDB.MongoDBCollection<TDocument> | null =
        null;

    constructor(private mongoConnectionService: MongoConnectionService) {}

    protected abstract getCollectionName(): string;

    protected async find(
        filter?: globalThis.Realm.Services.MongoDB.Filter,
        options?: globalThis.Realm.Services.MongoDB.FindOptions
    ) {
        const collection = await this.getCollection();
        const result = await collection.find(filter, options);
        return result;
    }

    protected async insertOne(document: TDocument): Promise<string> {
        const collection = await this.getCollection();
        const result = await collection.insertOne(document);
        return result.insertedId as string;
    }

    protected async updateOne(
        document: globalThis.Realm.Services.MongoDB.NewDocument<TDocument>
    ): Promise<void> {
        const collection = await this.getCollection();
        await collection.updateOne({ _id: document._id }, document);
    }

    protected async deleteOne(id: string): Promise<void> {
        const collection = await this.getCollection();
        await collection.deleteOne({ _id: id });
    }

    private async getCollection() {
        if (this.collection) {
            return this.collection;
        }
        const mongo = await this.mongoConnectionService.getMongo();
        this.collection = mongo
            .db('latvianWords')
            .collection(this.getCollectionName());
        return this.collection;
    }
}
