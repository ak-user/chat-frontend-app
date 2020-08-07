import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    userRequest;
    email: string;
    password: string;

    constructor(private readonly authenticationService: AuthenticationService, private router: Router) {
        if (this.authenticationService.currentTokenResponseValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
    }

    login() {
        this.userRequest = {
            email: this.email,
            password: this.password
        };
        this.authenticationService.login(this.userRequest).subscribe(
            resp => {
                this.router.navigate(['/']);
            }
        );
    }

}
