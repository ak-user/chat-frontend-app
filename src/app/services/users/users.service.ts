import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../../models/room.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private httpClient: HttpClient) { }

    getUserById(id: string): Observable<User> {
        return this.httpClient.get<User>(`${environment.apiURL}/api/users/${id}`);
    }

    getUserByEmail(email: string): Observable<User> {
        return this.httpClient.get<User>(`${environment.apiURL}/api/users?email=${email}`);
    }

    addUserToRoom(roomId: string, userId: string): Observable<Room> {
        return this.httpClient.put<Room>(`${environment.apiURL}/api/rooms/${roomId}/add-user`, { userId });
    }
}
