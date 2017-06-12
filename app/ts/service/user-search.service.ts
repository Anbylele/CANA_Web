import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
@Injectable()
export class UserSearchService {
    constructor(private http: Http) {}
    search(term: string): Observable<User[]> {
        return this.http
            .get(`app/heroes/?name=${term}`)
            .map((r: Response) => r.json().data as User[]);
    }
}
