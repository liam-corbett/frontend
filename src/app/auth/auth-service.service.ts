import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token!: string;

  constructor(private http: HttpClient, private router: Router) { }

  signup(useremail: string, userpassword: string, username: string, usersurname: string) {
    const userData = { email: useremail, password: userpassword, username: username, usersurname: usersurname };
    this.http.post('https://localhost:3008/api/users/signup', userData)
      .subscribe(response => {
        console.log('Success');
        this.router.navigate(['/login']);
      });
  }
  
  

  login(userusername: string, userpassword: string) {
    this.http.post<{ token: string }>('https://localhost:3008/api/users/login', { username: userusername, password: userpassword })
      .subscribe(response => {
        const token = response.token;
        localStorage.setItem('authToken', token);
        if (token) {
          this.token = token;
          console.log('Received Token:', token);
          this.router.navigate(['/display']);
        } else {
          console.log('Authentication error');
          
        }
      });
  }
  
  getToken() {
    return this.token;
  }
}
