import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

    constructor(private httpClient: HttpClient) { }

    createMessage(message: Message): Observable<Message> {
        return this.httpClient.post<Message>(`${environment.apiURL}/api/messages/create`, message);
    }

    getMessagesFromRoom(roomId: string) {
        return this.httpClient.get<Array<Message>>(`${environment.apiURL}/api/messages?roomId=${roomId}`);
    }
}
