import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Room } from '../../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

    constructor(private httpClient: HttpClient) { }

    createRoom(room: Room): Observable<Room> {
        return this.httpClient.post<Room>(`${environment.apiURL}/api/rooms/create`, room);
    }

    getAllRooms(userId: string): Observable<Array<Room>> {
        return this.httpClient.get<Array<Room>>(`${environment.apiURL}/api/rooms?userId=${userId}`);
    }
}
