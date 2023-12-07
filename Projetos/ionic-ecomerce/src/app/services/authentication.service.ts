import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private baseUrl = 'http://localhost:8080/api/v1/auth';
    private mostrarMenuSubject = new BehaviorSubject<boolean>(false);
    mostrarMenu$: Observable<boolean> = this.mostrarMenuSubject.asObservable();

    constructor(private http: HttpClient) {
    }

    emitirMostrarMenu(valor: boolean) {
        this.mostrarMenuSubject.next(valor);
    }

    isUserLoggedIn(): boolean {
        // Adicione a lógica para verificar se o usuário está logado
        // por exemplo, verificando a presença do token no armazenamento local
        const token = localStorage.getItem('token');
        return !!token;
    }

    register(registerRequest: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/register`, registerRequest);
    }

    getAuthToken(): string {
        return localStorage.getItem('token') || '';
    }

    login(authRequest: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/authenticate`, authRequest);
    }

    verifyCode(verificationRequest: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/verify`, verificationRequest);
    }

    isTokenExpired(token: string): boolean {
        const tokenData = this.parseJwt(token);
        const currentTime = Math.floor(Date.now() / 1000);

        return tokenData.exp && tokenData.exp < currentTime;
    }

    private parseJwt(token: string): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64));
        return JSON.parse(jsonPayload);
    }
}
