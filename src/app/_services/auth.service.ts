import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:3000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {username,password}, httpOptions);
  }

  signup(username: string, password: string, fullname: string): Observable<any> {
    return this.http.post(AUTH_API+'signup', { username, password, fullname }, httpOptions);
  }

  checkAuth(): Observable<any> {
    const token: TokenStorageService=new TokenStorageService();
    const token_string =token.getToken()||""
    var  options = {
      headers: new HttpHeaders({'x-access-token':token_string, 'Content-Type': 'application/json','a':'b'})
    };
    return this.http.post(AUTH_API + 'checkAuth',{}, options);
  }

  logout(): void {
    const token: TokenStorageService=new TokenStorageService();
    token.signOut()
  }
}

export const authGuard = async () => {
  const router = inject(Router);
  var httpClient = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  var authser: AuthService = new AuthService(httpClient);
  try {
    const resp = await firstValueFrom( authser.checkAuth())
    console.log(resp)
      if (resp.message!=undefined && resp.message=="ValidToken") {
        // console.log(resp)
        console.log('authGuard#canActivate called');
        return true;
      }
  } catch (err) {
    console.log(err)
    router.navigate(['/login']);
    }
    return false
  // return true
}
