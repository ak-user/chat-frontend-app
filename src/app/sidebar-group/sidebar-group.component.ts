import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoomsService } from '../services/rooms/rooms.service';
import { Room } from '../models/room.model';
import { MessagesService } from '../services/messages/messages.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AuthenticationService } from '../services/auth/authentication.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss']
})
export class SidebarGroupComponent implements OnInit {

    @Output() roomId = new EventEmitter<string>();
    rooms: Array<Room>;
    hasShowNewRoomPopup = false;
    hasShowNewConnectionToRoomPopup = false;
    newRoomName: string;
    email: string;
    userId: string;
    connectingRoomId: string;
    selectRoomId: string;

    constructor(private roomsService: RoomsService, private userService: UsersService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.userId = this.authenticationService.currentTokenResponseValue.userId;
        this.getAllRooms(this.userId);
    }

    getAllRooms(userId: string) {
        this.roomsService.getAllRooms(userId).subscribe(
            rooms => {
                this.rooms = rooms;
                this.selectRoom(rooms[0]._id)
            },
            error => {
                console.error(error);
            }
        )
    }

    selectRoom(id: string) {
        this.selectRoomId = id;
        this.roomId.emit(id)
    }

    deleteRoom(room: Room) {
        // delete
    }

    showNewRoomPopup() {
        this.hasShowNewRoomPopup = true;
    }

    showNewConnectionToRoomPopup(id: string) {
        this.hasShowNewConnectionToRoomPopup = true;
        this.connectingRoomId = id;

    }

    createRoom() {
        let room: Room = {
            name: this.newRoomName,
            date: new Date(),
            connections: [this.userId]
        };
        this.roomsService.createRoom(room).subscribe(resp => {
            this.hasShowNewRoomPopup = false;
            this.getAllRooms(this.userId);
        });
        this.hasShowNewRoomPopup = false;
        this.newRoomName = '';
    }

    createConnectionToRoom(id: string) {
        this.userService.getUserByEmail(this.email).subscribe(
            user => {
                this.userService.addUserToRoom(id, user._id).subscribe(
                    data => this.getAllRooms(this.userId)
                )
            }
        );
        this.hasShowNewConnectionToRoomPopup = false;
        this.email = '';
    }

    cancel() {
        this.hasShowNewRoomPopup = false;
        this.hasShowNewConnectionToRoomPopup = false;
    }
}
