import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../../models/tokenResponse.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<TokenResponse>;
    public currentUser: Observable<TokenResponse>;

    constructor(private httpClient: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<TokenResponse>(JSON.parse(localStorage.getItem('currentTokenResponse')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentTokenResponseValue(): TokenResponse {
        return this.currentUserSubject.value;
    }

    login(userRequest): Observable<TokenResponse> {
        return this.httpClient.post<TokenResponse>(`${environment.apiURL}/api/auth/login`, userRequest).pipe(map(tokenResponse => {
            if (tokenResponse.accessToken) {
                localStorage.setItem('currentTokenResponse', JSON.stringify(tokenResponse));
                this.currentUserSubject.next(tokenResponse);
            } else {
                console.error(tokenResponse);
            }
            return tokenResponse;
        }));
    }

    register(userRequest) {
        return this.httpClient.post<User>(`${environment.apiURL}/api/auth/register`, userRequest);
    }
}
