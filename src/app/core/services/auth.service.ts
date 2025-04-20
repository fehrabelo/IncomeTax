// src/app/core/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private apiUrl = 'https://sua-api.com/login'; // Substitua pela URL real da sua API

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    // Fazendo a chamada à API para login
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  storeToken(token: string): void {
    // Armazenando o token no localStorage
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    // Removendo o token e redirecionando para o login
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Verificando se o usuário está logado com base na presença do token
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    // Retornando o token armazenado
    return localStorage.getItem(this.tokenKey);
  }
}
