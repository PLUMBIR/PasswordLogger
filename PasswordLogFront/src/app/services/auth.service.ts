import { Injectable, signal } from "@angular/core";
import { UserModel } from "../models/UserModel";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { API_URL } from "../constants/URL";
import { tap } from "rxjs";
import { SignUpUserModel } from "../models/SignUpUserModel";
import { SignInUserModel } from "../models/SignInUserModel";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    user$ = signal<UserModel | null>(null);

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
    )
    {
      const user = localStorage.getItem('user');

      if (user) {
        this.user$.set(JSON.parse(user));
      }
    }

    signUp(userData: SignUpUserModel){
        return this.http
        .post<UserModel>(`${API_URL}/signup`, userData)
        .pipe(
            tap((res) => {
                if (res != null) {
                  localStorage.setItem('user', JSON.stringify(res));
                  this.user$.set(res);
                }
            })
        );
    }

    signIn(userData: SignInUserModel){
        return this.http
        .post<UserModel>(`${API_URL}/signin`, userData)
        .pipe(
            tap((res) => {
                if (res != null) {
                  localStorage.setItem('user', JSON.stringify(res));
                  this.user$.set(res);
                }
            })
        );
    }

    logOut() {
      localStorage.removeItem('user');
      this.user$.set(null);
      this.router.navigate(['']);
    }
}