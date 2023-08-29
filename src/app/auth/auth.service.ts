import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthService{
    constructor(private http: HttpClient){
    }
    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDE7U4UcQGRHV3v_UK0hsSt-EAiNqZyP9g',
        {
            email: email,
            password: password,
            returnSecureTokem: true
        })
        .pipe(catchError(this.handleError));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDE7U4UcQGRHV3v_UK0hsSt-EAiNqZyP9g',
        {
            email: email,
            password: password,
            returnSecureTokem: true
        }).pipe(catchError(this.handleError));

    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occured!';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email or password does not exist';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'This email or password is not correct.';
                    break;
            }
            return throwError(errorMessage);
    }
}