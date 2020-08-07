import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router } from '@angular/router';
import { WebSocketService } from '../services/web-socket/web-socket.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    userRequest;
    username: string[];
    email: string;
    password: string;

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit() {}

    registration() {
        this.userRequest = {
            username: this.username,
            email: this.email,
            password: this.password
        };
        this.authenticationService.register(this.userRequest).subscribe(
            resp => {
                const userRequest = {
                    email: resp.email,
                    password: resp.password
                };
                this.authenticationService.login(userRequest).subscribe(resp => {
                    this.router.navigate(['/'])
                });
            }
        );
    }

}
