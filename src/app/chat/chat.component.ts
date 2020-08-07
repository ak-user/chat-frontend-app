import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages/messages.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Message } from '../models/message.model';
import { WebSocketService } from '../services/web-socket/web-socket.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    messagesList: Array<Message>;
    hasShowProfile = false;
    userId: string;
    roomId: string;
    messageModel: string;

    constructor(
        private messagesService: MessagesService,
        private authenticationService: AuthenticationService,
        private webSocketService: WebSocketService,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.userId = this.authenticationService.currentTokenResponseValue.userId;
    }

    getRoomId(id: string) {
        this.roomId = id;
        this.getMessagesFromRoom(this.roomId)
    }

    getMessagesFromRoom(id: string) {
        this.messagesService.getMessagesFromRoom(id).subscribe(
            messages => this.messagesList = messages,
            error => console.error(error)
        )
    }

    putMessage() {
        const message: Message = {
            userId: this.userId,
            roomId: this.roomId,
            text: this.messageModel,
            created: new Date()
        };

        this.webSocketService.emit('messageToServer', message);
        this.webSocketService.listen('messageToClient').subscribe(
            message => {
                this.getMessagesFromRoom(this.roomId)
            }
        );
        this.messageModel = ''
    }

    // getUserById(id: string) {
    //     this.usersService.getUserById(id).subscribe()
    // }
}
