import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { UsersService } from '../services/users/users.service';
import { User } from '../models/user.model';

@Component({
    selector: 'app-global-navigation',
    templateUrl: './global-navigation.component.html',
    styleUrls: ['./global-navigation.component.scss']
})
export class GlobalNavigationComponent implements OnInit {
    userId: string;
    user: User;

    constructor(private authenticationService: AuthenticationService, private usersService : UsersService) {}

    ngOnInit() {
        this.userId = this.authenticationService.currentTokenResponseValue.userId;
        this.usersService.getUserById(this.userId).subscribe(user => {
             this.user = user;
        });
    }
}
