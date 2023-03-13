import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(private router: Router) {
        this.userSubject = new BehaviorSubject(
            JSON.parse(localStorage.getItem('user')!)
        );
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        const user: User = {
            username,
            password,
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}
