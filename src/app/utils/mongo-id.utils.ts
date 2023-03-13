import * as Realm from 'realm-web';

const {
    BSON: { ObjectId },
} = Realm;

export class MongoIdUtils {
    static generateId(): string {
        return new ObjectId(ObjectId.generate()).toHexString();
    }
}
