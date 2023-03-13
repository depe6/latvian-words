import { Injectable } from '@angular/core';
import { User } from 'src/app/models';
import { AuthService } from '../auth/auth.service';
import * as Realm from 'realm-web';

@Injectable({ providedIn: 'root' })
export class MongoConnectionService {
    private mongo: globalThis.Realm.Services.MongoDB | null = null;

    constructor(private authService: AuthService) {}

    async getMongo() {
        if (this.mongo) {
            return this.mongo;
        }
        const user = this.getUser();
        const app = new Realm.App({ id: user.username });
        const apiKey = user.password;
        const credentials = Realm.Credentials.apiKey(apiKey);
        const mongoUser = await app.logIn(credentials);

        const mongo = mongoUser.mongoClient('Cluster');
        return mongo;
    }

    private getUser(): User {
        if (!this.authService.userValue) {
            throw new Error('User not authenticated');
        }
        return this.authService.userValue;
    }
}
